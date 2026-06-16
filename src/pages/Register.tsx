import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const Register = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-card p-8 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Проверьте почту</h1>
          <p className="text-gray-600 mb-6">
            Мы отправили письмо с подтверждением на{" "}
            <strong>{email}</strong>. После подтверждения можете войти.
          </p>
          <Link to="/login" className="text-primary underline">
            Перейти ко входу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-card p-8">
        <h1 className="font-display text-2xl font-bold mb-6 text-center">Регистрация</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Пароль</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-medium py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Регистрируем..." : "Создать аккаунт"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-primary underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
