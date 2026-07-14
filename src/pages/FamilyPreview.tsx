import { Link } from "react-router-dom";
import FamilyScene from "@/components/FamilyScene";
import { Button } from "@/components/ui/button";

/** Предпросмотр финальной сцены «семья за столом». */
const FamilyPreview = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-6">
    <div className="w-full max-w-4xl">
      <FamilyScene />
    </div>
    <Button variant="outline" asChild>
      <Link to="/">На главную</Link>
    </Button>
  </div>
);

export default FamilyPreview;
