-- МЕбель: схема базы данных
-- Выполнить в SQL Editor Supabase Dashboard

-- Профили пользователей (создаются триггером при регистрации)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  phone text,
  role text not null default 'client' check (role in ('client', 'admin')),
  created_at timestamptz not null default now()
);

-- Обращения клиентов
create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'new' check (status in ('new', 'in_progress', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Сообщения в чате
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  text text not null,
  is_from_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- Документы
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  name text not null,
  url text not null,
  created_at timestamptz not null default now()
);

-- Платежи
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  amount numeric(12,2) not null,
  description text,
  status text not null default 'pending' check (status in ('pending', 'paid')),
  created_at timestamptz not null default now()
);

-- Триггер: создать профиль при регистрации пользователя
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'client')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS: включить построчную безопасность
alter table public.profiles enable row level security;
alter table public.requests enable row level security;
alter table public.messages enable row level security;
alter table public.documents enable row level security;
alter table public.payments enable row level security;

-- Политики: клиент видит только свои данные; admin видит всё
-- profiles
create policy "Пользователь читает свой профиль" on public.profiles
  for select using (auth.uid() = id);
create policy "Admin читает все профили" on public.profiles
  for select using ((auth.jwt()->>'role') = 'admin' or (select role from public.profiles where id = auth.uid()) = 'admin');

-- requests
create policy "Клиент видит свои обращения" on public.requests
  for all using (auth.uid() = client_id);
create policy "Admin видит все обращения" on public.requests
  for all using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- messages
create policy "Участники видят сообщения обращения" on public.messages
  for select using (
    exists (select 1 from public.requests where id = request_id and client_id = auth.uid())
    or (select role from public.profiles where id = auth.uid()) = 'admin'
  );
create policy "Участники пишут сообщения" on public.messages
  for insert with check (
    auth.uid() = sender_id
    and (
      exists (select 1 from public.requests where id = request_id and client_id = auth.uid())
      or (select role from public.profiles where id = auth.uid()) = 'admin'
    )
  );

-- documents
create policy "Клиент видит документы своих обращений" on public.documents
  for select using (
    exists (select 1 from public.requests where id = request_id and client_id = auth.uid())
    or (select role from public.profiles where id = auth.uid()) = 'admin'
  );
create policy "Admin управляет документами" on public.documents
  for all using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- payments
create policy "Клиент видит свои платежи" on public.payments
  for select using (
    exists (select 1 from public.requests where id = request_id and client_id = auth.uid())
    or (select role from public.profiles where id = auth.uid()) = 'admin'
  );
create policy "Admin управляет платежами" on public.payments
  for all using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- Включить Realtime для чата
alter publication supabase_realtime add table public.messages;
