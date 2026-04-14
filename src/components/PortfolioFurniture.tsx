import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

// ── Импорт фото через Vite glob ─────────────────────────────────────────────
const lightGlob   = import.meta.glob("../assets/portfolio/kitchens/light/*.{jpg,JPG}",           { eager: true, import: "default" }) as Record<string, string>;
const darkGlob    = import.meta.glob("../assets/portfolio/kitchens/dark/*.{jpg,JPG}",            { eager: true, import: "default" }) as Record<string, string>;
const minimalGlob = import.meta.glob("../assets/portfolio/kitchens/minimal/*.{jpg,JPG}",         { eager: true, import: "default" }) as Record<string, string>;
const blueGlob    = import.meta.glob("../assets/portfolio/kitchens/blue/*.{jpg,JPG}",            { eager: true, import: "default" }) as Record<string, string>;
const studioGlob  = import.meta.glob("../assets/portfolio/kitchens/studio/*.{jpg,JPG,jpeg}",     { eager: true, import: "default" }) as Record<string, string>;
const classicGlob = import.meta.glob("../assets/portfolio/wardrobes/classic/*.{jpg,JPG}",        { eager: true, import: "default" }) as Record<string, string>;
const hallwayGlob = import.meta.glob("../assets/portfolio/wardrobes/hallway/*.{jpg,JPG}",        { eager: true, import: "default" }) as Record<string, string>;
const bureauGlob  = import.meta.glob("../assets/portfolio/wardrobes/bureau/*.{jpg,JPG}",         { eager: true, import: "default" }) as Record<string, string>;
const luxuryGlob  = import.meta.glob("../assets/portfolio/dressing-rooms/luxury/*.{jpg,JPG}",    { eager: true, import: "default" }) as Record<string, string>;

const sorted = (g: Record<string, string>) => Object.keys(g).sort().map((k) => g[k]);

// ── Данные проектов ──────────────────────────────────────────────────────────
type Project = { title: string; subtitle: string; photos: string[] };

const CATEGORIES = ["Кухни", "Шкафы", "Гардеробные"] as const;
type Category = (typeof CATEGORIES)[number];

const PROJECTS: Record<Category, Project[]> = {
  Кухни: [
    {
      title: "Кухня в светлых тонах",
      subtitle: "Белый МДФ · столешница под дуб",
      photos: sorted(lightGlob),
    },
    {
      title: "Кухня в тёмном стиле",
      subtitle: "Тёмно-серый МДФ · стальные ручки",
      photos: sorted(darkGlob),
    },
    {
      title: "Синяя кухня",
      subtitle: "Синие фасады · акцентный цвет",
      photos: sorted(blueGlob),
    },
    {
      title: "Минимализм",
      subtitle: "Лаконичные линии · без лишнего декора",
      photos: sorted(minimalGlob),
    },
    {
      title: "Кухня в студии",
      subtitle: "Компактное решение · продуманное пространство",
      photos: sorted(studioGlob),
    },
  ],
  Шкафы: [
    {
      title: "Шкаф-купе",
      subtitle: "Классические раздвижные двери",
      photos: sorted(classicGlob),
    },
    {
      title: "Шкаф в прихожей",
      subtitle: "Встроенный · с подсветкой",
      photos: sorted(hallwayGlob),
    },
    {
      title: "Шкаф-бюро",
      subtitle: "Встроенный рабочий стол · спальня",
      photos: sorted(bureauGlob),
    },
  ],
  Гардеробные: [
    {
      title: "Гардеробная с подсветкой",
      subtitle: "LED-подсветка · открытые полки",
      photos: sorted(luxuryGlob),
    },
  ],
};

// ── Лайтбокс ────────────────────────────────────────────────────────────────
function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const total = project.photos.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-4xl bg-card rounded-2xl overflow-hidden shadow-2xl"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative aspect-[4/3] bg-muted overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={idx}
                src={project.photos[idx]}
                alt={`${project.title} — фото ${idx + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.22 }}
              />
            </AnimatePresence>

            {total > 1 && (
              <>
                <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition" aria-label="Предыдущее">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition" aria-label="Следующее">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  {idx + 1} / {total}
                </div>
              </>
            )}

            <button onClick={onClose} className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition" aria-label="Закрыть">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5">
            <h3 className="font-display text-lg font-bold">{project.title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{project.subtitle}</p>
            {total > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {project.photos.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition ${
                      i === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Основной компонент ───────────────────────────────────────────────────────
const PortfolioFurniture = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Кухни");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = PROJECTS[activeCategory];

  return (
    <section id="portfolio-furniture" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Корпусная мебель
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl">
            Кухни, шкафы и гардеробные, выполненные по индивидуальным проектам.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="flex gap-2 mb-10 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {projects.map((project, i) => (
              <AnimatedSection key={project.title} delay={i * 0.08}>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="group w-full text-left bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={project.photos[0]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">
                      {activeCategory}
                    </span>
                    <h3 className="font-display text-base font-bold mt-1">{project.title}</h3>
                    <p className="text-muted-foreground text-xs mt-1">{project.subtitle}</p>
                    {project.photos.length > 1 && (
                      <p className="text-xs text-primary/70 mt-2">{project.photos.length} фото →</p>
                    )}
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {selectedProject && (
        <Lightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default PortfolioFurniture;
