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
        router.refresh();
        console.log("refreshing");
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
      <div
        ref={ref}
        style={{
          background: "rgb(23, 23, 23)",
          width: "100%",
          borderRadius: "20px",
          padding: "30px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "rgb(30, 30, 30)",
            width: "70px",
            borderRadius: "5px",
            height: "20px",
          }}
        />
        <div
          style={{
            background: "rgb(30, 30, 30)",
            width: "70px",
            borderRadius: "5px",
            height: "20px",
            marginBlock: "10px",
          }}
        />

        <div
          style={{
            background: "rgb(30, 30, 30)",
            width: "100%",
            borderRadius: "10px",
            height: "50px",
          }}
        />
        <div
          style={{
            background: "rgb(30, 30, 30)",
            width: "100%",
            borderRadius: "10px",
            height: "50px",
          }}
        ></div>
        <div
          style={{
            background: "rgb(30, 30, 30)",
            width: "100%",
            borderRadius: "10px",
            height: "50px",
          }}
        />
        <div
          style={{
            background: "rgb(30, 30, 30)",
            width: "100%",
            borderRadius: "10px",
            height: "50px",
          }}
        />
        <div
          style={{
            background: "rgb(30, 30, 30)",
            width: "100%",
            borderRadius: "10px",
            height: "50px",
          }}
        />
        <div
          style={{
            background: "rgb(30, 30, 30)",
            width: "100%",
            borderRadius: "10px",
            height: "50px",
          }}
        />
        <div
          style={{
            background: "rgb(30, 30, 30)",
            width: "100%",
            borderRadius: "10px",
            height: "50px",
          }}
        />
        <div
          style={{
            background: "rgb(30, 30, 30)",
            width: "100%",
            borderRadius: "10px",
            height: "50px",
          }}
        />
      </div>
    </>
  );
}
