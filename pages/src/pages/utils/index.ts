export function getDomainFromPath(path: string) {
  if (!path) return path
  if (path.startsWith('http') || path.startsWith('https')) {
    const [protocol, url] = path.split('//')
    const domain = url.split('/')[0]
    return `${protocol}//${domain}`
  } else {
    return location.origin
  }
}
