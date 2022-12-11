import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

import { ItemData } from "../types";

export function Item({ title, id, thumbnailUrl }: ItemData) {
  return (
    <li className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200  dark:border-neutral-700 rounded-lg px-4 py-6">
      <Link href={String(id)} className="h-full">
        <div className="flex flex-col space-y-4 h-full items-center justify-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnailUrl}
            width="50"
            height="50"
            alt=""
            className="w-32 h-32 rounded-lg"
          />
          <h2 className="text-semibold text-lg m-0">{id}</h2>
          <h3 className="m-0">{title.substring(0, 40)}</h3>
        </div>
      </Link>
    </li>
  );
}

export const ItemLoading = forwardRef(function ItemLoading(_, ref) {
  return (
    <div
      // @ts-ignore
      ref={ref}
      className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200  dark:border-neutral-700 rounded-lg px-4 py-6"
    >
      <div className="flex flex-col space-y-4 h-full items-center justify-center text-center">
        <div className="animate-pulse bg-neutral-200 dark:bg-neutral-600 rounded-lg w-32 h-32 max-w-full" />
        <div className="animate-pulse bg-neutral-200 dark:bg-neutral-600 rounded-lg w-12 h-8" />
        <div className="animate-pulse bg-neutral-200 dark:bg-neutral-600 rounded-lg w-48 max-w-full h-12" />
      </div>
    </div>
  );
});
