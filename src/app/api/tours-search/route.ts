import { NextResponse } from 'next/server';

// Client calls /api/tours-search over HTTPS; this route runs only on the server and calls the backend (http is OK here).
const API_BASE_URL = process.env.API_BASE_URL || 'http://155.212.208.92:8000';
const url = `${API_BASE_URL}/api/search`;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { text: string; user_id?: number };

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: body.text,
        user_id: body.user_id ?? 1,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => '<no body>');
      console.error('VDS API error', {
        status: resp.status,
        statusText: resp.statusText,
        text,
      });
      return NextResponse.json(
        {
          reply: 'Сервис временно недоступен, попробуйте еще раз позже.',
        },
        { status: 502 },
      );
    }

    const data = (await resp.json()) as { reply?: string };
    return NextResponse.json({ reply: data.reply ?? '' });
  } catch (error) {
    console.error('VDS API network error', error);
    if (error instanceof Error) {
      console.error('name:', error.name, 'message:', error.message, 'stack:', error.stack);
    }
    return NextResponse.json(
      {
        reply: 'Сервис временно недоступен, попробуйте еще раз позже.',
      },
      { status: 500 },
    );
  }
}
