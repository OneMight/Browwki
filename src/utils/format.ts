export function telegramLink(handle: string): string {
  return `https://t.me/${handle.replace("@", "")}`;
}
