import { comments } from "@client/app/api/comments/data";

export function GET() {
  return Response.json(comments);
}
