-- Обращения клиентов
create table if not exists requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'done', 'cancelled')),
  created_at timestamptz not null default now()
);

-- Сообщения по обращению
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references requests(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  text text not null,
  created_at timestamptz not null default now()
);

-- Документы клиента
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

-- Платежи клиента
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(12, 2) not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamptz not null default now()
);

-- RLS: включить для всех таблиц
alter table requests enable row level security;
alter table messages enable row level security;
alter table documents enable row level security;
alter table payments enable row level security;

-- Политики: клиент видит только свои данные
create policy "requests: клиент видит свои" on requests
  for all using (auth.uid() = client_id);

create policy "messages: клиент видит свои" on messages
  for all using (
    exists (select 1 from requests r where r.id = request_id and r.client_id = auth.uid())
  );

create policy "documents: клиент видит свои" on documents
  for all using (auth.uid() = client_id);

create policy "payments: клиент видит свои" on payments
  for all using (auth.uid() = client_id);

-- Storage bucket для документов
insert into storage.buckets (id, name, public)
  values ('documents', 'documents', false)
  on conflict (id) do nothing;

create policy "documents storage: владелец" on storage.objects
  for all using (bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]);
