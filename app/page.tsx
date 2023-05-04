import { Suspense } from "react";
import { InfiniteScrollWrapper } from "./components/InfiniteScrollWrapper";
import { Item } from "./components/Item";
import { ItemData } from "./types";

// @ts-ignore
export default function Home({ searchParams }) {
  const { page } = searchParams;

  const intPage = parseInt(page ?? "0");

  return (
    <div className="space-y-12">
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <InfiniteScrollWrapper>
          <>
            {[...Array(intPage + 1)].map((_, index) => {
              const start = index * 10;
              const limit = start + 10;

              console.log({ start, limit });

              /** @ts-ignore */
              return <Page start={start} limit={limit} key={start} />;
            })}
          </>
        </InfiniteScrollWrapper>
      </ul>
    </div>
  );
}

async function Page({ start, limit }: { start: number; limit: number }) {
  const response = await fetch(
    `http://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`
  );
  const items: ItemData[] = await response.json();

  return (
    <Suspense fallback={<p>Loading</p>}>
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </Suspense>
  );
}
