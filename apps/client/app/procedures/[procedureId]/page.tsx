import { API_PROCEDURES_URL } from "@client/common/constants";
import { ProcedureEntity } from "@server/procedure/entities/Procedure.entity";

export default async function Procedure({
  params,
}: {
  params: {
    procedureId: string;
  };
}) {
  const url = `${API_PROCEDURES_URL}/${params.procedureId}`;
  console.log({ url });
  const procedure: ProcedureEntity | null = await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.log(error));
  return (
    <section>
      {procedure?.id ? (
        <div>
          <h1>Procedure:</h1>
          <p>id: {procedure.id}</p>
          <p>name: {procedure.name}</p>
          <p>price: {procedure.price}</p>
        </div>
      ) : (
        <div>Procedure with id № {params.procedureId} not found</div>
      )}
    </section>
  );
}
