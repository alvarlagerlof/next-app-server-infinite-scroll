import styles from "./page.module.css";

export default function Home() {
  // import { useVirtualizer } from "@tanstack/react-virtual";

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>List!</h1>
        {/** @ts-ignore */}
        <List length={20} />
      </main>
    </div>
  );
}

type Item = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

async function List({ length }: { length: number }) {
  const response = await fetch(
    `http://jsonplaceholder.typicode.com/photos?_start=${0}&_limit=${le}`
  );
  const people: Item[] = await response.json();

  return (
    <ul>
      {people.map((item) => {
        return (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.url}</p>
          </li>
        );
      })}
    </ul>
  );
}
