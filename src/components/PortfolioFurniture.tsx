import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import PortfolioLightbox from "./PortfolioLightbox";
import { CATEGORIES, PROJECTS } from "@/data/portfolioProjects";
import type { Category, Project } from "@/data/portfolioProjects";

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
        <PortfolioLightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default PortfolioFurniture;
