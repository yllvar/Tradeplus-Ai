import { OpenAI } from 'openai';

// Helper function to convert a stream to a ReadableStream
function streamToReadableStream(stream: any): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.choices[0]?.delta?.content) {
          controller.enqueue(encoder.encode(chunk.choices[0].delta.content));
        }
      }
      controller.close();
    },
  });
}

export const runtime = 'edge';

// Create OpenAI API client only on the server side
function createOpenAIClient() {
  if (typeof window !== 'undefined') {
    throw new Error('OpenAI client should only be created on the server side');
  }
  
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  
  return new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: false, // Explicitly disable browser usage
  });
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Initialize OpenAI client here to ensure it's only done on the server
    const openai = createOpenAIClient();

    const systemMessage = {
      role: 'system',
      content: `You are CryptoCoach, an AI trading assistant that helps users learn about cryptocurrency trading.
- Provide clear, educational explanations
- Never give financial advice
- Explain concepts in simple terms
- Be patient and encouraging
- Use markdown formatting for better readability`,
    };

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      stream: true,
      messages: [systemMessage, ...messages],
    });

    // Convert the response to a ReadableStream
    const stream = streamToReadableStream(response);
    
    // Return the stream as a response
    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(JSON.stringify({ error: 'Error processing your request' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
