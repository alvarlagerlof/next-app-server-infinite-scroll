"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ItemLoading } from "./Item";

export function InfiniteScrollWrapper({
  page,
  children,
}: {
  page: number;
  children: ReactNode;
}) {
  const [pages, setPages] = useState(new Map([[1, children]]));

  useEffect(() => {
    // console.log(children)
    setPages((prevPages) => {
      console.log("prevpages", prevPages);
      prevPages.set(page, children);
      return prevPages;
    });
  }, [page]);

  // console.log("PAGES", pages);

  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Ugly, I know
        if (entry.isIntersecting) {
          // router.replace(
          //   `?page=${parseInt(searchParams.get("page") ?? "0") + 1}`
          // );
          // router.refresh();
          console.log("loading more");
        }
      },
      { rootMargin: "1200px" }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [router, searchParams]);

  return (
    <>
      {[...pages].map(([key, value]) => {
        return (
          <>
            <p className="col-span-4">Start</p>
            {value}
            <p className="col-span-4">end</p>
          </>
        );
      })}
      <ItemLoading ref={ref} />
      <ItemLoading />
      <ItemLoading />
      <ItemLoading />
      <button
        onClick={() => {
          router.replace(
            `?page=${parseInt(searchParams.get("page") ?? "0") + 1}`
          );
          // router.refresh();
        }}
      >
        Load more
      </button>
    </>
  );
}
