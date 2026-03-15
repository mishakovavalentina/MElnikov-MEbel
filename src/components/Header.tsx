import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Направления", href: "#directions" },
  { label: "Портфолио", href: "#portfolio-furniture" },
  { label: "Как мы работаем", href: "#process" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <a href="#" className="font-display text-xl font-bold tracking-tight">
          <span className="text-me-accent">МЕ</span>льников-
          <span className="text-me-accent">МЕ</span>бель
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact-form")}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
          >
            Заказать замер
          </button>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card shadow-card overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="font-body text-left py-2 text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#contact-form")}
                className="bg-primary text-primary-foreground px-5 py-3 rounded-md text-sm font-medium mt-2"
              >
                Заказать замер
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
