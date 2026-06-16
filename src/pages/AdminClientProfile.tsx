import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Profile, Request, Document, Payment } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, FileText, CreditCard, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import AdminChatWindow from '@/components/admin/AdminChatWindow';

const requestStatusOptions: { value: Request['status']; label: string }[] = [
  { value: 'new', label: 'Новое' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'completed', label: 'Завершено' },
];

const paymentStatusOptions: { value: Payment['status']; label: string }[] = [
  { value: 'pending', label: 'Ожидает оплаты' },
  { value: 'paid', label: 'Оплачено' },
];

const AdminClientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    if (!id) return;
    supabase.from('profiles').select('*').eq('id', id).single().then(({ data }) => setProfile(data));
    supabase.from('requests').select('*').eq('client_id', id).order('created_at', { ascending: false })
      .then(({ data }) => {
        setRequests(data ?? []);
        if (data && data.length > 0) setSelectedRequest(data[0]);
      });
  }, [id]);

  useEffect(() => {
    if (!selectedRequest) return;
    supabase.from('documents').select('*').eq('request_id', selectedRequest.id).order('created_at')
      .then(({ data }) => setDocuments(data ?? []));
    supabase.from('payments').select('*').eq('request_id', selectedRequest.id).order('created_at')
      .then(({ data }) => setPayments(data ?? []));
  }, [selectedRequest]);

  const updateRequestStatus = async (status: Request['status']) => {
    if (!selectedRequest) return;
    const { error } = await supabase.from('requests').update({ status, updated_at: new Date().toISOString() }).eq('id', selectedRequest.id);
    if (error) toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    else {
      setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status } : r));
      setSelectedRequest(prev => prev ? { ...prev, status } : null);
      toast({ title: 'Статус обновлён' });
    }
  };

  const updatePaymentStatus = async (paymentId: string, status: Payment['status']) => {
    const { error } = await supabase.from('payments').update({ status }).eq('id', paymentId);
    if (error) toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    else {
      setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, status } : p));
      toast({ title: 'Статус платежа обновлён' });
    }
  };

  if (!profile) return <div className="flex h-screen items-center justify-center text-stone-400">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-4 py-3 flex items-center gap-3">
        <Link to="/admin">
          <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center">
          <User className="w-4 h-4 text-stone-500" />
        </div>
        <div>
          <h1 className="font-semibold text-stone-800">{profile.full_name ?? 'Клиент'}</h1>
          <p className="text-xs text-stone-400">{profile.phone ?? 'телефон не указан'}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Request selector */}
        {requests.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-stone-600 whitespace-nowrap">Обращение:</span>
            <Select
              value={selectedRequest?.id ?? ''}
              onValueChange={val => setSelectedRequest(requests.find(r => r.id === val) ?? null)}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Выберите обращение" />
              </SelectTrigger>
              <SelectContent>
                {requests.map(req => (
                  <SelectItem key={req.id} value={req.id}>{req.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {!selectedRequest && requests.length === 0 && (
          <p className="text-stone-400 text-sm text-center py-8">У клиента нет обращений</p>
        )}

        {selectedRequest && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left column */}
            <div className="space-y-4">
              {/* Request status */}
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-stone-600">Статус обращения</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedRequest.status} onValueChange={v => updateRequestStatus(v as Request['status'])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {requestStatusOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-stone-400 mt-2">
                    Создано: {format(new Date(selectedRequest.created_at), 'd MMMM yyyy', { locale: ru })}
                  </p>
                  {selectedRequest.description && (
                    <p className="text-sm text-stone-600 mt-2">{selectedRequest.description}</p>
                  )}
                </CardContent>
              </Card>

              {/* Documents */}
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-stone-600 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Документы ({documents.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {documents.length === 0 ? (
                    <p className="text-xs text-stone-400">Документов нет</p>
                  ) : (
                    <div className="space-y-2">
                      {documents.map(doc => (
                        <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-stone-700 hover:text-stone-900 underline">
                          <FileText className="w-3 h-3 text-stone-400" /> {doc.name}
                        </a>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payments */}
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-stone-600 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Платежи ({payments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {payments.length === 0 ? (
                    <p className="text-xs text-stone-400">Платежей нет</p>
                  ) : (
                    payments.map(pay => (
                      <div key={pay.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-stone-700">{pay.description ?? 'Платёж'}</span>
                          <span className="font-semibold text-stone-800">{pay.amount.toLocaleString('ru')} ₽</span>
                        </div>
                        <Select value={pay.status} onValueChange={v => updatePaymentStatus(pay.id, v as Payment['status'])}>
                          <SelectTrigger className="h-7 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {paymentStatusOptions.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Separator className="mt-2" />
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right column: Chat */}
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-stone-600 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Переписка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AdminChatWindow requestId={selectedRequest.id} />
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminClientProfile;
