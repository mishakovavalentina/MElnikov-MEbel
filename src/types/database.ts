export type RequestStatus = 'new' | 'in_progress' | 'completed';
export type PaymentStatus = 'pending' | 'paid';

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: 'client' | 'admin';
  created_at: string;
}

export interface Request {
  id: string;
  client_id: string;
  title: string;
  description: string | null;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  request_id: string;
  sender_id: string;
  text: string;
  is_from_admin: boolean;
  created_at: string;
}

export interface Document {
  id: string;
  request_id: string;
  name: string;
  url: string;
  created_at: string;
}

export interface Payment {
  id: string;
  request_id: string;
  amount: number;
  description: string | null;
  status: PaymentStatus;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      requests: {
        Row: Request;
        Insert: Omit<Request, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Request, 'id' | 'created_at'>>;
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, 'id' | 'created_at'>;
        Update: Partial<Omit<Message, 'id' | 'created_at'>>;
      };
      documents: {
        Row: Document;
        Insert: Omit<Document, 'id' | 'created_at'>;
        Update: Partial<Omit<Document, 'id' | 'created_at'>>;
      };
      payments: {
        Row: Payment;
        Insert: Omit<Payment, 'id' | 'created_at'>;
        Update: Partial<Omit<Payment, 'id' | 'created_at'>>;
      };
    };
  };
}
