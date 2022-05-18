export const plural = (n: number, text: string) => {
  if (n === 0 || n === 1) {
    return text
  }
  return `${text}s`
}
