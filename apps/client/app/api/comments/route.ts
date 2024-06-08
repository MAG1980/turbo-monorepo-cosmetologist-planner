import { Comment } from "@client/app/api/comments/data";
import { comments } from "@client/app/api/comments/data";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const filteredComments = query
    ? comments.filter((comment) => comment.text.includes(query))
    : comments;
  return Response.json(filteredComments);
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
