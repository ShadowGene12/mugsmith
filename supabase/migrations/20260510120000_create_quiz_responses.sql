-- Create custom types
CREATE TYPE email_event_type AS ENUM ('scheduled', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed');

-- Create quiz_responses table
CREATE TABLE quiz_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    archetype TEXT NOT NULL,
    answers JSONB NOT NULL,
    scores JSONB NOT NULL,
    tiebreaker_used TEXT,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    turnstile_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance and deduplication
CREATE INDEX idx_quiz_responses_email ON quiz_responses(email);
CREATE INDEX idx_quiz_responses_archetype ON quiz_responses(archetype);
CREATE INDEX idx_quiz_responses_created_at ON quiz_responses(created_at);
CREATE INDEX idx_quiz_responses_email_created_at ON quiz_responses(email, created_at);

-- Create email_events table
CREATE TABLE email_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_response_id UUID NOT NULL REFERENCES quiz_responses(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    archetype TEXT NOT NULL,
    sequence_step INTEGER NOT NULL CHECK (sequence_step >= 1 AND sequence_step <= 5),
    event_type email_event_type NOT NULL,
    provider_message_id TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for email tracking
CREATE INDEX idx_email_events_quiz_response_id ON email_events(quiz_response_id);
CREATE INDEX idx_email_events_email ON email_events(email);
CREATE INDEX idx_email_events_email_step ON email_events(email, sequence_step);
CREATE INDEX idx_email_events_created_at ON email_events(created_at);

-- Create admin_users table
CREATE TABLE admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT now()
);
