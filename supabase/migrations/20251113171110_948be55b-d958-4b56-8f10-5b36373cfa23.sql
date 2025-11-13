-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  customer_fb TEXT,
  customer_email TEXT,
  customer_phone TEXT NOT NULL,
  delivery_name TEXT NOT NULL,
  delivery_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_email TEXT,
  items JSONB NOT NULL,
  total_price BIGINT NOT NULL,
  payment_method TEXT NOT NULL,
  payment_proof_url TEXT,
  status TEXT DEFAULT 'chưa thanh toán',
  deleted_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_insert_orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "public_select_orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "public_update_orders" ON public.orders FOR UPDATE USING (true);
CREATE POLICY "public_delete_orders" ON public.orders FOR DELETE USING (true);

INSERT INTO storage.buckets (id, name, public) VALUES ('payment-proofs', 'payment-proofs', true) ON CONFLICT DO NOTHING;

CREATE POLICY "public_insert_payment_proofs" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'payment-proofs');
CREATE POLICY "public_select_payment_proofs" ON storage.objects FOR SELECT USING (bucket_id = 'payment-proofs');