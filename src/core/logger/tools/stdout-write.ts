import process from 'process'
export function stdoutWrite(value: string) {
  process.stdout.write(value)
}
