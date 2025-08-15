import { ip } from 'address'

export function getIPAddress(): string {
  return String(ip())
}
