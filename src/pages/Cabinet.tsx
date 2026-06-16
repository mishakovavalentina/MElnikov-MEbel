import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

const Cabinet = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-card p-8 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Личный кабинет</h1>
        <p className="text-gray-600 mb-6">Вы вошли как: <strong>{user?.email}</strong></p>
        <button
          onClick={handleSignOut}
          className="bg-primary text-primary-foreground font-medium px-6 py-2 rounded-lg hover:opacity-90 transition"
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Cabinet;
