import { useEffect, useRef, useState } from "react";
import { FileDown, Trash2, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  storage_path: string;
  created_at: string;
}

const CabinetDocuments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [docs, setDocs] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("documents")
      .select("id, name, storage_path, created_at")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false });
    setDocs((data as Document[]) ?? []);
  };

  useEffect(() => { load(); }, [user]);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const path = `${user.id}/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("documents").upload(path, file);
    if (error) {
      toast({ title: "Ошибка загрузки", description: error.message, variant: "destructive" });
    } else {
      await supabase.from("documents").insert({ client_id: user.id, name: file.name, storage_path: path });
      await load();
      toast({ title: "Файл загружен" });
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const download = async (doc: Document) => {
    const { data } = await supabase.storage.from("documents").createSignedUrl(doc.storage_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  const remove = async (doc: Document) => {
    await supabase.storage.from("documents").remove([doc.storage_path]);
    await supabase.from("documents").delete().eq("id", doc.id);
    setDocs((prev) => prev.filter((d) => d.id !== doc.id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-semibold text-gray-800">Документы</h1>
        <Button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="bg-amber-600 hover:bg-amber-700 gap-2"
        >
          <Upload size={16} />
          {uploading ? "Загрузка..." : "Загрузить файл"}
        </Button>
        <input ref={fileRef} type="file" className="hidden" onChange={upload} />
      </div>

      {docs.length === 0 ? (
        <p className="text-gray-400">Документов пока нет.</p>
      ) : (
        <div className="space-y-2">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-3.5"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(doc.created_at).toLocaleDateString("ru-RU")}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => download(doc)} title="Скачать">
                  <FileDown size={16} className="text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => remove(doc)} title="Удалить">
                  <Trash2 size={16} className="text-red-400" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CabinetDocuments;
