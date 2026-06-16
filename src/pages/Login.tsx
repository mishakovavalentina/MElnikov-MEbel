import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate("/cabinet");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-card p-8">
        <h1 className="font-display text-2xl font-bold mb-6 text-center">Вход</h1>
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
            {loading ? "Входим..." : "Войти"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-primary underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
