import axios from "axios";

interface CalcularResponse {
  valorBruto: number;
  valorLiquido: number;
  taxaDiaria: number;
  periodoDias: number;
}

// Usando axios diretamente, sem baseURL, pois o proxy cuida disso
export async function calcular(dataRecebimento: string, xmlFile: File): Promise<CalcularResponse> {
  const formData = new FormData();
  formData.append("xmlFile", xmlFile);

  const resposta = await axios.post(`/calcular?dataRecebimento=${encodeURIComponent(dataRecebimento)}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return resposta.data;
}
