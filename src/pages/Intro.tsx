import { useState } from "react";
import { Link } from "react-router-dom";
import CartoonIntro from "@/components/CartoonIntro";
import { Button } from "@/components/ui/button";

/**
 * Страница предпросмотра мультзаставки «Юра-Северянин» (сцена сопки).
 * Кнопка «Повторить» перезапускает анимацию за счёт remount по key.
 */
const Intro = () => {
  const [runId, setRunId] = useState(0);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-6">
      <div className="w-full max-w-4xl">
        <CartoonIntro key={runId} />
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={() => setRunId((n) => n + 1)}>Повторить</Button>
        <Button variant="outline" asChild>
          <Link to="/">На главную</Link>
        </Button>
      </div>
    </div>
  );
};

export default Intro;
