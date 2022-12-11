import { ReactNode } from "react";

export function Code({ children }: { children: ReactNode }) {
  return (
    <pre className="inline bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-1 py-0.5">
      {children}
    </pre>
  );
}
