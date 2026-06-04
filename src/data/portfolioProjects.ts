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

export type Project = { title: string; subtitle: string; photos: string[] };

export const CATEGORIES = ["Кухни", "Шкафы", "Гардеробные"] as const;
export type Category = (typeof CATEGORIES)[number];

export const PROJECTS: Record<Category, Project[]> = {
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
