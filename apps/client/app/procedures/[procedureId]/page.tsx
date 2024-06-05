import { Metadata } from "next";
import { API_PROCEDURES_URL } from "@client/common/constants";
import { ProcedureEntity } from "@server/procedure/entities/Procedure.entity";

type ProcedureProps = {
  params: {
    procedureId: string;
  };
};

export async function generateMetadata({
  params,
}: ProcedureProps): Promise<Metadata> {
  const url = `${API_PROCEDURES_URL}/${params.procedureId}`;
  console.log({ url });
  const procedure: ProcedureEntity | null = await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.log(error));
  return {
    title: procedure?.name,
  };
}
export default async function Procedure({ params }: ProcedureProps) {
  const url = `${API_PROCEDURES_URL}/${params.procedureId}`;
  console.log({ url });
  const procedure: ProcedureEntity | null = await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.log(error));
  if (!procedure?.id) {
    throw new Error(`Procedure with id ${params.procedureId} not found`);
  }
  return (
    <section>
      <div>
        <h1>Procedure:</h1>
        <p>id: {procedure?.id}</p>
        <p>name: {procedure?.name}</p>
        <p>price: {procedure?.price}</p>
      </div>
    </section>
  );
}
