import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/portfolioProjects";

function PortfolioLightbox({ project, onClose }: { project: Project; onClose: () => void }) {
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

export default PortfolioLightbox;
