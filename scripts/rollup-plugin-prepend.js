export default function prepend(content = '') {
  return {
    name: 'prepend',
    renderChunk (code) {
      return `${content}\n${code}`
    }
  }
}
