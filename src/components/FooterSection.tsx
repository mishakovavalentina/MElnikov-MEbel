const FooterSection = () => (
  <footer className="py-8 border-t border-foreground/[0.06]">
    <div className="container mx-auto px-4 lg:px-8 text-center">
      <p className="font-display text-sm font-bold">
        <span className="text-me-accent">МЕ</span>льников-
        <span className="text-me-accent">МЕ</span>бель
      </p>
      <p className="text-muted-foreground text-xs mt-1">© {new Date().getFullYear()} Все права защищены</p>
    </div>
  </footer>
);

export default FooterSection;
