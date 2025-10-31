import { createDeepSeek } from "@ai-sdk/deepseek";
import { convertToModelMessages, streamText, UIMessage } from "ai";

const deepseekModel = createDeepSeek({
	apiKey: process.env.DEEPSEEK_API_KEY ?? "",
});

export async function POST(req: Request) {
	const { messages }: { messages: UIMessage[] } = await req.json();

	const result = streamText({
		model: deepseekModel("deepseek-chat"),
		messages: convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse({
		headers: {
			"Content-Type": "application/octet-stream",
			"Content-Encoding": "none",
		},
	});
}
