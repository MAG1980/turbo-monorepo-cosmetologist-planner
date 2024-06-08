import { comments } from "@client/app/api/comments/data";
import { Request } from "next/dist/compiled/@edge-runtime/primitives";
import { redirect } from "next/navigation";

export function GET(_request: Request, { params }: { params: { id: string } }) {
  if (parseInt(params.id) > comments.length) {
    return redirect("/api/comments");
  }
  const comment = comments.find(
    (comment) => comment.id === parseInt(params.id),
  );
  return Response.json(comment, { status: 200 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const index = comments.findIndex(
    (comment) => comment.id === parseInt(params.id),
  );
  if (index === -1) {
    return new Response("Comment not found", { status: 404 });
  }

  const comment = comments[index];
  if (!comment) {
    return new Response("Comment not found", { status: 404 });
  }
  comment.text = body.text;
  return new Response(JSON.stringify(comment), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const index = comments.findIndex(
    (comment) => comment.id === parseInt(params.id),
  );
  if (index === -1) {
    return new Response("Comment not found", { status: 404 });
  }
  comments.splice(index, 1);
  return new Response(null, {
    status: 204,
  });
}
