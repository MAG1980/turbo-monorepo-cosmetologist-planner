export const ServerSide = async () => {
  const response = await fetch("http://localhost:5000/api").then((res) =>
    res.text(),
  );
  return <h1>{response}</h1>;
};
