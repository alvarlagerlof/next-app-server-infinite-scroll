// @ts-ignore
export default async function Home({ params }) {
  const { id } = params;

  const response = await fetch(
    `http://jsonplaceholder.typicode.com/photos/${id}`
  );
  const item = await response.json();

  console.log(item);

  return (
    <div
      style={{
        padding: "100px",
      }}
    >
      <h1>{item.title}</h1>
      <img src={item.url} />
    </div>
  );
}
