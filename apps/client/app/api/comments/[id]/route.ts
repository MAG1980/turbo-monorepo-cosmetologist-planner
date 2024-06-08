import { comments } from "@client/app/api/comments/data";

export function GET(_request: Request, { params }: { params: { id: string } }) {
  console.log("id", params.id);
  const comment = comments.find(
    (comment) => comment.id === parseInt(params.id),
  );
  return Response.json(comment, { status: 200 });
}
