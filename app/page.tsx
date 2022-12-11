import Link from "next/link";
import { Suspense } from "react";
import { InfiniteScrollWrapper } from "./components/InfiniteScrollWrapper";

import styles from "./page.module.css";
import { Item } from "./types";

// @ts-ignore
export default function Home({ searchParams }: PageProps) {
  const { page } = searchParams;

  const intPage = parseInt(page ?? "0");

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Link href="/">
          <h1>List</h1>
        </Link>

        <ul className={styles.list}>
          <InfiniteScrollWrapper>
            <>
              {[...Array(intPage + 1)].map((_, index) => {
                const start = index * 10;
                const limit = start + 10;

                console.log({ start, limit });

                return (
                  <div key={start}>
                    {/** @ts-ignore */}
                    <ListPart start={start} limit={limit} />
                  </div>
                );
              })}
            </>
          </InfiniteScrollWrapper>
        </ul>
      </main>
    </div>
  );
}

async function ListPart({ start, limit }: { start: number; limit: number }) {
  const response = await fetch(
    `http://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${10}`
  );
  const items: Item[] = await response.json();

  return (
    <div className={styles.listPart}>
      <p>Start: {start}</p>
      <p>Limit: {limit}</p>

      <Suspense fallback={<p>Loading</p>}>
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </Suspense>
    </div>
  );
}

function Item({ title, id, thumbnailUrl }: Item) {
  return (
    <li style={{ width: "600px", maxWidth: "90%" }}>
      <Link href={String(id)}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
          }}
        >
          <img src={thumbnailUrl} width="50" height="50" />
          <h2>
            {id}: {title}
          </h2>
        </div>
      </Link>
    </li>
  );
}
