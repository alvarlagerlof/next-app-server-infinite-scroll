import { Suspense, createServerContext, useContext } from "react";
import { InfiniteScrollWrapper } from "./components/InfiniteScrollWrapper";
import { Item } from "./components/Item";
import { ItemData } from "./types";

const ITEMS_PER_PAGE = 4;

const newSessionId = Math.random()
const SessionContext = createServerContext('MyContext', newSessionId)

export const revalidate = 0

// @ts-ignore
export default function Home({ searchParams }) {
  const { page } = searchParams;

  const sessionId = useContext(SessionContext)
  console.log({sessionId, newSessionId})
  const isNewSession = sessionId === newSessionId


  const intPage = parseInt(page ?? "0");



  return (
    <div className="space-y-12">
      <h2>{isNewSession ? "new session": "old session"}</h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <InfiniteScrollWrapper page={intPage}>
          {/*@ts-expect-error Async */}
          <Page
            start={(intPage - 1) * ITEMS_PER_PAGE}
            limit={ITEMS_PER_PAGE}
            key={intPage}
          />
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
