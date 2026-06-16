import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";

interface Payment {
  id: string;
  amount: number;
  status: "pending" | "paid" | "failed" | "refunded";
  created_at: string;
}

const statusLabel: Record<Payment["status"], string> = {
  pending: "Ожидает оплаты",
  paid: "Оплачено",
  failed: "Ошибка",
  refunded: "Возврат",
};

const statusColor: Record<Payment["status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-600",
  refunded: "bg-gray-100 text-gray-500",
};

const CabinetPayments = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("payments")
      .select("id, amount, status, created_at")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setPayments((data as Payment[]) ?? []);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p className="text-gray-400">Загрузка...</p>;

  const total = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold text-gray-800 mb-6">Платежи</h1>

      {payments.length === 0 ? (
        <p className="text-gray-400">Платежей пока нет.</p>
      ) : (
        <>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-5 inline-flex flex-col">
            <span className="text-xs text-amber-600 mb-1">Итого оплачено</span>
            <span className="text-2xl font-semibold text-amber-800">
              {total.toLocaleString("ru-RU")} ₽
            </span>
          </div>

          <div className="space-y-2">
            {payments.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-3.5"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {p.amount.toLocaleString("ru-RU")} ₽
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(p.created_at).toLocaleDateString("ru-RU")}
                  </p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[p.status]}`}>
                  {statusLabel[p.status]}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CabinetPayments;
