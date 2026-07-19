import axios from 'axios'

const normalizeApiUrl = (url: string) => {
  const trimmedUrl = url.trim()

  if (!trimmedUrl) return ''

  if (
    trimmedUrl.startsWith('http://') ||
    trimmedUrl.startsWith('https://')
  ) {
    return trimmedUrl.replace(/\/+$/, '')
  }

  return `https://${trimmedUrl.replace(/\/+$/, '')}`
}

export const API_URL = normalizeApiUrl(
  import.meta.env.VITE_API_URL ?? '',
)

if (!API_URL) {
  console.error('VITE_API_URL is missing')
}

const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  withCredentials: true,
})

export default api