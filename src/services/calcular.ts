import api from "./api";

interface CalcularResponse {
  valorBruto: number;
  valorLiquido: number;
  taxaDiaria: number;
  periodoDias: number;
}

export async function calcular(dataRecebimento: string, xmlFile: File): Promise<CalcularResponse> {
  const formData = new FormData();
  formData.append("xmlFile", xmlFile);

  const resposta = await api.post(`/calcular?dataRecebimento=${encodeURIComponent(dataRecebimento)}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return resposta.data;
}
