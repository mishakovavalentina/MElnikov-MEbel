import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const schema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  if (user) return <Navigate to={isAdmin ? '/admin' : '/cabinet'} replace />;

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        toast({ title: 'Регистрация успешна', description: 'Проверьте почту для подтверждения.' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        navigate('/cabinet');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Произошла ошибка';
      toast({ title: 'Ошибка', description: message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
      <Card className="w-full max-w-sm shadow-card">
        <CardHeader className="text-center">
          <div className="font-display text-2xl font-bold text-stone-800 mb-1">МЕбель</div>
          <CardTitle className="text-lg font-semibold text-stone-700">
            {isRegister ? 'Регистрация' : 'Вход в кабинет'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" type="password" placeholder="••••••" {...register('password')} />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Загрузка...' : isRegister ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-stone-500">
            {isRegister ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
            <button
              type="button"
              className="text-stone-800 underline hover:no-underline"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </p>
          <div className="mt-4 text-center">
            <a href="/" className="text-xs text-stone-400 hover:text-stone-600">← На главную</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
