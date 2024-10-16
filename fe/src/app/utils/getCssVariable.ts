import { CssVariables } from "../entities/CssVariables";

/**
 * Retorna o valor de uma variável CSS definida no :root do documento.
 *
 * A função utiliza `getComputedStyle` para buscar o valor de uma variável CSS
 * a partir do seu nome, que deve ser uma das variáveis CSS predefinidas no sistema.
 *
 * @param {CssVariables} variableName - O nome da variável CSS que deseja obter. Deve ser uma das seguintes opções:
 *  - '--background'
 *  - '--foreground'
 *  - '--card'
 *  - '--card-foreground'
 *  - '--popover'
 *  - '--popover-foreground'
 *  - '--primary'
 *  - '--primary-foreground'
 *  - '--secondary'
 *  - '--secondary-foreground'
 *  - '--muted'
 *  - '--muted-foreground'
 *  - '--accent'
 *  - '--accent-foreground'
 *  - '--destructive'
 *  - '--destructive-foreground'
 *  - '--border'
 *  - '--input'
 *  - '--ring'
 *  - '--radius'
 *  - '--chart-1'
 *  - '--chart-2'
 *  - '--chart-3'
 *  - '--chart-4'
 *  - '--chart-5'
 *
 * @returns {string} O valor da variável CSS solicitada. Se a variável não estiver definida ou não for encontrada,
 * retorna uma string vazia.
 *
 * @example
 * // Exemplo de uso:
 * const primaryColor = getCssVariable('--primary');
 * console.log(primaryColor); // Exibe o valor da variável --primary no console
 */
export const getCssVariable = (variableName: CssVariables): string => {
  const variable = getComputedStyle(document.documentElement).getPropertyValue(
    variableName
  );

  const hslMatch = variable.split(" ");

  if (hslMatch) {
    const h = parseInt(hslMatch[0]);
    const s = parseFloat(hslMatch[1]);
    const l = parseFloat(hslMatch[2]);
    return hslToHex(h, s, l); // Converte HSL para HEX
  }

  return variable;
};

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
