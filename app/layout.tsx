import Link from "next/link";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className}>
      <body className="flex flex-col items-center px-4 py-2 dark:bg-neutral-900 dark:text-white">
        <div className="w-full lg:max-w-4xl lg:w-full space-y-8">
          <nav className="w-full text-xl font-semibold py-6 border-0 border-b border-b-neutral-200 dark:border-b-neutral-700">
            <Link href="/">
              Next 13 appDir Inifinite Scrolling Server Components Demo
            </Link>
          </nav>
          <div className="w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
