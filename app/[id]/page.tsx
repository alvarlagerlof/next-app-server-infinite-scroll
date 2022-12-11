import { ItemData } from "../types";

// @ts-ignore
export default async function Home({ params }) {
  const { id } = params;

  const response = await fetch(
    `http://jsonplaceholder.typicode.com/photos/${id}`
  );
  const item: ItemData = await response.json();

  return (
    <div className="w-full space-y-8">
      <h1 className="text-4xl font-semibold">{item.title}</h1>
      <img src={item.url} />
    </div>
  );
}
