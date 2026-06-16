import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import type { Message } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Props {
  requestId: string;
}

const AdminChatWindow = ({ requestId }: Props) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.from('messages').select('*').eq('request_id', requestId).order('created_at')
      .then(({ data }) => setMessages(data ?? []));

    const channel = supabase
      .channel(`admin-chat-${requestId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `request_id=eq.${requestId}` },
        payload => setMessages(prev => [...prev, payload.new as Message]))
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [requestId]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    setSending(true);
    const { error } = await supabase.from('messages').insert({
      request_id: requestId,
      sender_id: user!.id,
      text: text.trim(),
      is_from_admin: true,
    });
    if (error) toast({ title: 'Ошибка отправки', description: error.message, variant: 'destructive' });
    else setText('');
    setSending(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {messages.length === 0 && (
          <p className="text-sm text-stone-400 text-center py-4">Сообщений пока нет</p>
        )}
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.is_from_admin ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-3 py-2 max-w-xs text-sm ${msg.is_from_admin ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-800'}`}>
              {!msg.is_from_admin && <p className="text-xs opacity-60 mb-1">Клиент</p>}
              {msg.text}
              <div className="text-xs mt-1 opacity-60">
                {format(new Date(msg.created_at), 'HH:mm', { locale: ru })}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2 mt-1">
        <Input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Ответить клиенту..."
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
        />
        <Button size="sm" onClick={sendMessage} disabled={sending || !text.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AdminChatWindow;
