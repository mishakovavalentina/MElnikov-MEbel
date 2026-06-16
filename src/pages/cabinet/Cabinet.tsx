import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import type { Request } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Plus, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import NewRequestDialog from '@/components/cabinet/NewRequestDialog';

const statusLabel: Record<Request['status'], string> = {
  new: 'Новое',
  in_progress: 'В работе',
  completed: 'Завершено',
};

const statusVariant: Record<Request['status'], 'default' | 'secondary' | 'outline'> = {
  new: 'default',
  in_progress: 'secondary',
  completed: 'outline',
};

const Cabinet = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('client_id', user!.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Ошибка загрузки', description: error.message, variant: 'destructive' });
    } else {
      setRequests(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchRequests(); }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between">
        <div>
          <span className="font-display font-bold text-stone-800 text-lg">МЕбель</span>
          <span className="ml-2 text-sm text-stone-500">Личный кабинет</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-600 hidden sm:inline">{user?.email}</span>
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-1" /> Выйти
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 space-y-4">
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-xl font-semibold text-stone-800">Мои обращения</h1>
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-1" /> Новое обращение
          </Button>
        </div>

        {loading && <p className="text-stone-500 text-sm">Загрузка...</p>}

        {!loading && requests.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="py-10 text-center text-stone-400">
              Обращений пока нет. Создайте первое!
            </CardContent>
          </Card>
        )}

        {requests.map(req => (
          <Link key={req.id} to={`/cabinet/request/${req.id}`}>
            <Card className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base font-semibold text-stone-800">{req.title}</CardTitle>
                  <Badge variant={statusVariant[req.status]}>{statusLabel[req.status]}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-stone-500 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                {formatDistanceToNow(new Date(req.created_at), { addSuffix: true, locale: ru })}
              </CardContent>
            </Card>
          </Link>
        ))}
      </main>

      <NewRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreated={fetchRequests}
      />
    </div>
  );
};

export default Cabinet;
