import { FileText } from "lucide-react";

export default function App() {
  return (
    <div className="w-[400px] h-[600px] flex items-center justify-center flex items-center justify-center bg-fundo px-4">
      <div className="bg-white w-full max-w-md p-6 rounded shadow">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-6 h-6 text-blue-500" />
          <h1 className="text-green-900 text-xl font-bold">
            Upload da nota fiscal
          </h1>
        </div>

        <p className="text-green-600 text-base mb-6">
          Faça upload do arquivo XML da sua nota fiscal para análise.
        </p>

        <div className="p-8 w-full bg-white rounded-lg shadow-lg border border-dashed border-green-600">
          <div className="flex items-center gap-3">
            {/* Aqui entra o botão ou dropzone */}
          </div>
        </div>
      </div>
    </div>
  );
}
