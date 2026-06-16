import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";

interface Request {
  id: string;
  title: string;
  status: "new" | "in_progress" | "done" | "cancelled";
  created_at: string;
}

const statusLabel: Record<Request["status"], string> = {
  new: "Новое",
  in_progress: "В работе",
  done: "Завершено",
  cancelled: "Отменено",
};

const statusColor: Record<Request["status"], string> = {
  new: "bg-blue-100 text-blue-700",
  in_progress: "bg-amber-100 text-amber-700",
  done: "bg-green-100 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
};

const CabinetRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("requests")
      .select("id, title, status, created_at")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setRequests((data as Request[]) ?? []);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p className="text-gray-400">Загрузка...</p>;

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold text-gray-800 mb-6">Мои обращения</h1>

      {requests.length === 0 ? (
        <p className="text-gray-400">Обращений пока нет.</p>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <Link
              key={r.id}
              to={`/cabinet/chat/${r.id}`}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-amber-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-4">
                <MessageSquare size={18} className="text-amber-600 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800">{r.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(r.created_at).toLocaleDateString("ru-RU")}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[r.status]}`}>
                {statusLabel[r.status]}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CabinetRequests;
