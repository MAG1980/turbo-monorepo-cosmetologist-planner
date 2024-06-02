import { ProcedureEntity } from "@server/procedure/entities/Procedure.entity";
import { API_PROCEDURES_URL } from "@client/common/constants";

export const ServerSide = async () => {
  const procedures: ProcedureEntity[] = await fetch(API_PROCEDURES_URL).then(
    (res) => res.json(),
  );
  return (
    <section>
      <h2>Server side requested data</h2>
      <ul>
        {procedures.map((procedure) => (
          <li key={procedure.id}>
            {procedure.name} : {procedure.price}
          </li>
        ))}
      </ul>
    </section>
  );
};
