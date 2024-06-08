import { Comment } from "@client/app/api/comments/data";
import { comments } from "@client/app/api/comments/data";

export function GET() {
  return Response.json(comments);
}

export async function POST(request: Request) {
  const data: { text: string } = await request.json();
  const comment: Comment = {
    id: comments.length + 1,
    text: data.text,
  };
  comments.push(comment);
  return new Response(JSON.stringify(comment), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}
