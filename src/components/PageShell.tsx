import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="page-shell">
      <header className="page-hero">
        <div className="page-hero-grid" />
        <div className="content-wrap relative z-10">
          <p className="eyebrow">DAD / {eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-intro">{intro}</p>
        </div>
      </header>
      <div className="content-wrap page-content">{children}</div>
    </main>
  );
}

export function ContentBand({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`content-band ${className}`}>{children}</section>;
}

export function DetailList({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="detail-list">
      {items.map((item, index) => (
        <article key={item.title}>
          <span className="detail-index">0{index + 1}</span>
          <div><h3>{item.title}</h3><p>{item.text}</p></div>
        </article>
      ))}
    </div>
  );
}