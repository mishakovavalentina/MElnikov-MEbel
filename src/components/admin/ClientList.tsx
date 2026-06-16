import { Link } from 'react-router-dom';
import type { Profile } from '@/types/database';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Props {
  clients: (Profile & { request_count: number })[];
}

const ClientList = ({ clients }: Props) => {
  if (clients.length === 0) {
    return <p className="text-stone-400 text-sm text-center py-8">Клиентов пока нет</p>;
  }

  return (
    <div className="space-y-2">
      {clients.map(client => (
        <Link key={client.id} to={`/admin/client/${client.id}`}>
          <Card className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer">
            <CardContent className="py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone-200 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-stone-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-stone-800 truncate">
                  {client.full_name ?? client.id.slice(0, 8) + '…'}
                </p>
                <p className="text-xs text-stone-400 truncate">
                  {client.phone ?? 'телефон не указан'} · {client.request_count} обращ.
                </p>
              </div>
              <span className="text-xs text-stone-400 flex-shrink-0">
                {formatDistanceToNow(new Date(client.created_at), { addSuffix: true, locale: ru })}
              </span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ClientList;
