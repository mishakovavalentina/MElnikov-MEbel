import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogOut, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ClientList from '@/components/admin/ClientList';

type ClientWithCount = Profile & { request_count: number };

const Admin = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [clients, setClients] = useState<ClientWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'client')
        .order('created_at', { ascending: false });

      if (error) {
        toast({ title: 'Ошибка загрузки', description: error.message, variant: 'destructive' });
        setLoading(false);
        return;
      }

      const { data: counts } = await supabase
        .from('requests')
        .select('client_id');

      const countMap: Record<string, number> = {};
      (counts ?? []).forEach(r => {
        countMap[r.client_id] = (countMap[r.client_id] ?? 0) + 1;
      });

      setClients((profiles ?? []).map(p => ({ ...p, request_count: countMap[p.id] ?? 0 })));
      setLoading(false);
    };

    fetchClients();
  }, []);

  const filtered = clients.filter(c =>
    (c.full_name ?? '').toLowerCase().includes(search.toLowerCase()) ||
    (c.phone ?? '').includes(search)
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between">
        <div>
          <span className="font-display font-bold text-stone-800 text-lg">МЕбель</span>
          <span className="ml-2 text-sm text-stone-500">Кабинет администратора</span>
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
          <h1 className="text-xl font-semibold text-stone-800">Клиенты</h1>
          <span className="text-sm text-stone-400">{clients.length} чел.</span>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <Input
            className="pl-9"
            placeholder="Поиск по имени или телефону..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-stone-500 text-sm">Загрузка...</p>
        ) : (
          <ClientList clients={filtered} />
        )}
      </main>
    </div>
  );
};

export default Admin;
