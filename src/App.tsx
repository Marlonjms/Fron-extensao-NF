import { FileText } from "lucide-react";

export default function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-sky-50">
      <div className="p-8 w-[320px] bg-white rounded-lg shadow-lg border border-dashed border-green-600">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-green-600" />
          <div>
            <h1 className="text-green-600 text-xl font-bold">
              Upload da nota fiscal
            </h1>
            <p className="text-green-600 text-base">
              Faça upload do arquivo XML da sua nota fiscal para análise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
