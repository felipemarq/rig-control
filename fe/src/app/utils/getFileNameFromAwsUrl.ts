export function getFileNameFromAwsUrl(url: string) {
  // Dividir a URL pelo caractere '/' e pegar a última parte
  const parts = url.split("/");
  const fileNameWithUUID = parts[parts.length - 1];

  // Dividir pelo UUID e pegar a segunda parte (o nome do arquivo)
  const fileName = fileNameWithUUID.split("-").slice(1).join("-");

  return fileName;
}
