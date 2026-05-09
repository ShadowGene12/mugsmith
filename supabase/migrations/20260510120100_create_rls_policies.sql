-- Enable RLS on all tables
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- quiz_responses policies
-- Deny all INSERTs from anon role. Only service_role can insert.
CREATE POLICY "Deny anonymous inserts on quiz_responses"
ON quiz_responses FOR INSERT
TO anon
WITH CHECK (false);

-- Allow service role full access (service role bypasses RLS by default, but good to be explicit or if we change role attributes)
CREATE POLICY "Allow service role full access on quiz_responses"
ON quiz_responses FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow authenticated admins to view all responses
CREATE POLICY "Allow admins to view all quiz_responses"
ON quiz_responses FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
  )
);

-- email_events policies
-- Only service_role needs access (used by n8n or Edge Functions)
CREATE POLICY "Allow service role full access on email_events"
ON email_events FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow admins to view email events
CREATE POLICY "Allow admins to view email_events"
ON email_events FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
  )
);

-- admin_users policies
-- Authenticated users can view their own record to verify admin status
CREATE POLICY "Users can view their own admin status"
ON admin_users FOR SELECT
TO authenticated
USING (id = auth.uid());
