import { copyFileSync, mkdirSync } from 'fs'
import { dirname } from 'path'

const src = './dist/index.html'
const dest = './dist/404.html'

try {
  mkdirSync(dirname(dest), { recursive: true })
  copyFileSync(src, dest)
  console.log('Copied index.html to 404.html')
} catch (err) {
  console.error('Failed to create 404.html:', err)
  process.exit(1)
}
