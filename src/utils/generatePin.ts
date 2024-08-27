export function gerarStringAleatoria() {
  const caracteres = "abcdefghijklmnopqrstuvwxyz0123456789";
  let resultado = "";
  const comprimento = 6;
  for (let i = 0; i < comprimento; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    resultado += caracteres.charAt(indiceAleatorio);
  }
  return resultado;
}
