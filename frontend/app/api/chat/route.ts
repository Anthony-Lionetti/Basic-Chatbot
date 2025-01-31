"use server";
import { groqRequest } from "../(service)/groq";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // get new message
    const newMessage = { role: "user", content: data.message };
    // Add message to chat history
    const response = await groqRequest([...data.chatHistory, newMessage]);

    return Response.json({ status: 200, response: response });
  } catch (err) {
    console.error(err);
    return Response.json({ status: 500, message: "Error" });
  }
}
