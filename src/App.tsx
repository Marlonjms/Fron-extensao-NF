import { useState } from "react";
import { FileText, Upload } from "lucide-react";

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDate, setSelectDate] = useState<string>("");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  }
  return (
    <div className="w-[600px] h-auto flex flex-col items-center justify-center bg-fundo p-4 m-1">
      <div className="bg-white p-6 rounded shadow w-full">
        <div className="flex flex-col gap-0 mb-4">
          <div className="flex items-center gap-1.5">
            <FileText className="w-5 h-5 text-blue-500" />
            <h1 className="text-neutral-600 text-[24px] font-sans font-medium">
              Upload da Nota Fiscal
            </h1>
          </div>
          <p className="text-neutral-500 text-sans font-normal text-[15px]">
            Faça upload do arquivo XML da sua nota fiscal para análise.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Selecione a data
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectDate(e.target.value)}
            className="border border-neutral-300 rounded p-2 w-full"
          />
        </div>

        <label
          htmlFor="xmlUpload"
          className=" w-full h-auto rounded-lg border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center bg-transparent cursor-pointer pb-15 pt-10 "
        >
          <Upload className="w-11 h-11 text-neutral-500 mb-1" />
          <span className="text-neutral-800 text-[15px] font-sans font-medium">
            Arraste seu arquivo XML aqui
          </span>
          <span className="text-neutral-500 text-sans font-normal text-[12px]">
            ou clique para selecionar
          </span>
          <input
            id="xmlUpload"
            type="file"
            accept=".xml"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {selectedFile && (
          <div className="mt-4 text-[14px] font-sans font-medium text-neutral-700   bg-blue-50 p-2 ">
            <strong className=" ">Arquivo selecionado:</strong>{" "}
            {selectedFile.name}
          </div>
        )}
      </div>
    </div>
  );
}
