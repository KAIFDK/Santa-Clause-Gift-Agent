import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Store runId per user/session
const sessionStore = new Map();

/**
 * POST /api/chat - Initial message (creates new run)
 * Body: { message: "user message" }
 * Returns: streaming response with X-Toolhouse-Run-ID header captured
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const sessionId_value = sessionId || `session_${Date.now()}`;

    // Call Toolhouse API - POST
    const response = await fetch(process.env.TOOLHOUSE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    // Capture the X-Toolhouse-Run-ID from response headers
    const runId = response.headers.get('X-Toolhouse-Run-ID');
    if (runId) {
      sessionStore.set(sessionId_value, runId);
    }

    // Set response headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Session-ID', sessionId_value);

    // Stream the response
    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
        }
      } catch (error) {
        console.error('Streaming error:', error);
        res.write(`data: ${JSON.stringify({ error: 'Streaming failed' })}\n\n`);
      } finally {
        res.end();

        // Save to Supabase after streaming completes
        saveToSupabase(message, 'pending', sessionId_value);
      }
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

/**
 * PUT /api/chat/:sessionId - Follow-up message (uses existing run)
 * Body: { message: "user message" }
 */
app.put('/api/chat/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const runId = sessionStore.get(sessionId);
    if (!runId) {
      return res.status(400).json({ error: 'Invalid session. Start a new chat first.' });
    }

    // Call Toolhouse API - PUT
    const response = await fetch(`${process.env.TOOLHOUSE_ENDPOINT}/${runId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    // Set response headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Stream the response
    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
        }
      } catch (error) {
        console.error('Streaming error:', error);
        res.write(`data: ${JSON.stringify({ error: 'Streaming failed' })}\n\n`);
      } finally {
        res.end();

        // Save to Supabase
        saveToSupabase(message, 'completed', sessionId);
      }
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

/**
 * GET /api/chat/history/:sessionId - Get chat history
 */
app.get('/api/chat/history/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    const { data, error } = await supabase
      .from('under_the_tree')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ messages: data || [] });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

/**
 * Helper function to save message to Supabase
 */
async function saveToSupabase(itemName, description, sessionId) {
  try {
    const { error } = await supabase.from('under_the_tree').insert([
      {
        item_name: itemName,
        description: description,
        session_id: sessionId,
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
    }
  } catch (error) {
    console.error('Save to Supabase error:', error);
  }
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`🎄 Santa's Backend Server running on http://localhost:${PORT}`);
  console.log(`Toolhouse Endpoint: ${process.env.TOOLHOUSE_ENDPOINT}`);
  console.log(`Supabase Connected: ${supabaseUrl}`);
});
