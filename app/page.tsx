import Link from "next/link";
import { Suspense } from "react";
import { Code } from "./components/Code";
import { InfiniteScrollWrapper } from "./components/InfiniteScrollWrapper";
import { Item } from "./components/Item";
import { ItemData } from "./types";

// @ts-ignore
export default function Home({ searchParams }) {
  const { page } = searchParams;

  const intPage = parseInt(page ?? "0");

  return (
    <div className="space-y-12">
      <header className="space-y-8 leading-relaxed">
        <p>
          This is a demo exploring using React 18 Server components as a
          mechanism to load more and render more data in an infinite scrolling
          list. The project is made in Next.js 13 in the <Code>app</Code> dir.
        </p>
        <p>
          It works by using query params. By default, one &quot;page&quot; is
          loaded. As you scorll down, a client component containing an
          IntersectionOvserver is triggered, which adds <Code>1</Code> to the
          query param using <Code>router.replace</Code>. The reason it&apos;s{" "}
          <Code>.replace</Code> and not <Code>.push</Code> to not fill the
          history with query params, so that the back button still works as
          expected. Then <Code>router.refresh()</Code> is called to tell Next to
          keep the scroll position. (Still exploring that part)
        </p>
        <p>
          All in all, this setup causes some server components to render,
          refreshing the page, while still keeping the scroll position.
        </p>
        <p>
          The reason why it&apos;s resonably fast is because it uses the{" "}
          <Link href="https://vercel.com/blog/introducing-the-edge-runtime">
            Edge Runtime
          </Link>{" "}
          on Vercel to render, which has no cold boot time.
        </p>
      </header>
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
