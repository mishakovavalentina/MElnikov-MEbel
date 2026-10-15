import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import FooterSection from "./FooterSection";

const LegalPageLayout = ({ title, children }: { title: string; children: ReactNode }) => {
  useEffect(() => {
    document.title = `${title} — МЕбель`;
    window.scrollTo(0, 0);
    return () => {
      document.title = "МЕбель";
    };
  }, [title]);

  return (
    <>
      <header className="border-b border-foreground/[0.06]">
        <div className="container mx-auto px-4 lg:px-8 py-5">
          <Link to="/" className="font-display text-lg font-bold">
            <span className="text-me-accent">МЕ</span>льников-<span className="text-me-accent">МЕ</span>бель
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 lg:px-8 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">{title}</h1>
        <div className="space-y-6 text-sm leading-relaxed text-foreground/85 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:underline">
          {children}
        </div>
        <p className="mt-12">
          <Link to="/" className="text-primary underline hover:opacity-80">← Вернуться на главную</Link>
        </p>
      </main>
      <FooterSection />
    </>
  );
};

export default LegalPageLayout;
