import { useState } from "react";
import { FileText, Upload, TrendingUp, Clock, DollarSign } from "lucide-react";
import Button from "./components/Button";
import { calcular } from "./services/calcular";

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDate, setSelectDate] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [resultado, setResultado] = useState<{
    valorBruto: number;
    valorLiquido: number;
    taxaDiaria: number;
    periodoDias: number;
  } | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  }

  async function simulateApiCall() {
    if (!selectedFile || !selectedDate) {
      alert("Por favor, selecione a data e o arquivo XML.");
      return;
    }

    try {
      const res = await calcular(selectedDate, selectedFile);
      setResultado(res);
      setShowResult(true);
    } catch (error: any) {
      const mensagemErro =
        error.response?.data?.erro || error.message || "Erro inesperado.";
      alert(`Erro: ${mensagemErro}`);
      console.error(error);
    }
  }

  return (
    <div className="w-[700px] h-auto flex flex-col items-center justify-center bg-fundo p-4 m-1">
      <div className="bg-white p-6 rounded shadow w-full">
        {!showResult || !resultado ? (
          <>
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
              className="w-full h-auto rounded-lg border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center bg-transparent cursor-pointer pb-15 pt-10"
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
              <div className="mt-4 text-[14px] font-sans font-medium text-neutral-700 bg-blue-50 p-2">
                <strong>Arquivo selecionado:</strong> {selectedFile.name}
              </div>
            )}

            <Button label="Realizar Simulação" onClick={simulateApiCall} />
          </>
        ) : (
          <>
            <div className="w-full flex items-center justify-between mb-6">
              <button
                className="flex items-center text-sm text-neutral-600 hover:text-neutral-800 transition"
                onClick={() => {
                  setShowResult(false);
                  setResultado(null);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Voltar
              </button>

              <div className="text-right text-sm text-neutral-500">
                {selectedFile && (
                  <p className="font-medium text-neutral-700 truncate max-w-[220px]">
                    {selectedFile.name}
                  </p>
                )}
                {selectedDate && <p>{selectedDate}</p>}
              </div>
            </div>

            <div className="flex flex-col gap-0 mb-4">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h1 className="text-neutral-600 text-[24px] font-sans font-medium">
                  Simulação de Antecipação
                </h1>
              </div>
              <p className="text-neutral-500 text-sans font-normal text-[14px]">
                Resultado do cálculo de antecipação
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <div className="flex flex-col items-center bg-blue-50 p-3 rounded">
                <Clock className="text-blue-500 w-7 h-7 mb-1" />
                <span className="text-neutral-500 text-sans text-[14px]">
                  Dias Antecipados
                </span>
                <span className="text-blue-500 text-[22px] font-bold">
                  {resultado.periodoDias}
                </span>
              </div>

              <div className="flex flex-col items-center bg-blue-50 p-3 rounded">
                <DollarSign className="text-neutral-500 w-7 h-7 mb-1" />
                <span className="text-neutral-500 text-sans text-[14px]">
                  Taxa Total
                </span>
                <span className="text-neutral-700 text-[22px] font-bold">
                  {(resultado.taxaDiaria * resultado.periodoDias * 100).toFixed(
                    3
                  )}
                  %
                </span>
              </div>

              <div className="flex flex-col items-center bg-red-50 p-3 rounded">
                <DollarSign className="text-red-400 w-7 h-7 mb-1" />
                <span className="text-neutral-500 text-sans text-[14px]">
                  Desconto
                </span>
                <span className="text-red-400 text-[22px] font-bold">
                  R${" "}
                  {(resultado.valorBruto - resultado.valorLiquido).toFixed(2)}
                </span>
              </div>

              <div className="flex flex-col items-center bg-green-100 p-3 rounded">
                <DollarSign className="text-green-500 w-7 h-7 mb-1" />
                <span className="text-neutral-500 text-sans text-[14px]">
                  Valor Antecipado
                </span>
                <span className="text-green-500 text-[22px] font-bold">
                  R$ {resultado.valorLiquido.toFixed(2)}
                </span>
              </div>
            </div>

            <hr className="my-6 border-t border-neutral-200" />
            <div className="border border-neutral-300 rounded-md px-3 py-1 text-sm text-neutral-700 inline-flex items-center gap-2">
              <span className="text-neutral-500 text-xs">Taxa Diária:</span>
              <span className="font-medium">
                {(resultado.taxaDiaria * 100).toFixed(4)}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-neutral-500 text-sm">
                Simulação baseada em taxa mensal de{" "}
                <span className="font-medium text-neutral-700">
                  {(resultado.taxaDiaria * 30 * 100).toFixed(2)}%
                </span>
              </p>

              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium text-sm transition"
                onClick={() => alert("Solicitação enviada!")}
              >
                Solicitar Antecipação
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
