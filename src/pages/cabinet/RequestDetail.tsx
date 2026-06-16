import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import type { Request, Message, Document, Payment } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Send, FileText, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const statusLabel: Record<Request['status'], string> = {
  new: 'Новое', in_progress: 'В работе', completed: 'Завершено',
};

const paymentStatusLabel: Record<Payment['status'], string> = {
  pending: 'Ожидает оплаты', paid: 'Оплачено',
};

const RequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [request, setRequest] = useState<Request | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    supabase.from('requests').select('*').eq('id', id).single().then(({ data }) => setRequest(data));
    supabase.from('messages').select('*').eq('request_id', id).order('created_at').then(({ data }) => setMessages(data ?? []));
    supabase.from('documents').select('*').eq('request_id', id).order('created_at').then(({ data }) => setDocuments(data ?? []));
    supabase.from('payments').select('*').eq('request_id', id).order('created_at').then(({ data }) => setPayments(data ?? []));

    const channel = supabase
      .channel(`request-${id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `request_id=eq.${id}` },
        payload => setMessages(prev => [...prev, payload.new as Message]))
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [id]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async () => {
    if (!text.trim() || !id) return;
    setSending(true);
    const { error } = await supabase.from('messages').insert({
      request_id: id,
      sender_id: user!.id,
      text: text.trim(),
      is_from_admin: false,
    });
    if (error) toast({ title: 'Ошибка отправки', description: error.message, variant: 'destructive' });
    else setText('');
    setSending(false);
  };

  if (!request) return <div className="flex h-screen items-center justify-center text-stone-400">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-4 py-3 flex items-center gap-3">
        <Link to="/cabinet">
          <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="font-semibold text-stone-800 truncate">{request.title}</h1>
        </div>
        <Badge variant={request.status === 'new' ? 'default' : request.status === 'in_progress' ? 'secondary' : 'outline'}>
          {statusLabel[request.status]}
        </Badge>
      </header>

      <div className="max-w-3xl mx-auto p-4 space-y-4">
        {/* Chat */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-stone-600">Переписка с мастером</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {messages.length === 0 && (
                <p className="text-sm text-stone-400 text-center py-4">Сообщений пока нет</p>
              )}
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.is_from_admin ? 'justify-start' : 'justify-end'}`}>
                  <div className={`rounded-lg px-3 py-2 max-w-xs text-sm ${msg.is_from_admin ? 'bg-stone-100 text-stone-800' : 'bg-stone-800 text-white'}`}>
                    {msg.text}
                    <div className={`text-xs mt-1 opacity-60`}>
                      {format(new Date(msg.created_at), 'HH:mm', { locale: ru })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <Separator className="my-3" />
            <div className="flex gap-2">
              <Input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Напишите сообщение..."
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              />
              <Button size="sm" onClick={sendMessage} disabled={sending || !text.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        {documents.length > 0 && (
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-stone-600 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Документы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {documents.map(doc => (
                <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-stone-700 hover:text-stone-900 underline">
                  <FileText className="w-4 h-4 text-stone-400" /> {doc.name}
                </a>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Payments */}
        {payments.length > 0 && (
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-stone-600 flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Платежи
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {payments.map(pay => (
                <div key={pay.id} className="flex items-center justify-between text-sm">
                  <span className="text-stone-700">{pay.description ?? 'Платёж'}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-stone-800">{pay.amount.toLocaleString('ru')} ₽</span>
                    <Badge variant={pay.status === 'paid' ? 'outline' : 'secondary'}>
                      {paymentStatusLabel[pay.status]}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RequestDetail;
