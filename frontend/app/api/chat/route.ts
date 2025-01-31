"use server";
import { groqRequest } from "../(service)/groq";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const response = groqRequest(data);

    console.log(response);
    return new Response("Success!");
  } catch (err) {
    console.error(err);
    return new Response("An Error Occurred");
  }
}
