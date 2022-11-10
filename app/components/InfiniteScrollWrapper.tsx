"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useEffect, useRef } from "react";

export function InfiniteScrollWrapper({
  children,
}: {
  children: ReactElement;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Ugly, I know
      if (entry.isIntersecting) {
        router.push(`?page=${parseInt(searchParams.get("page") ?? "0") + 1}`);
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [router, searchParams]);

  return (
    <>
      {children}
      <div ref={ref} />
    </>
  );
}
