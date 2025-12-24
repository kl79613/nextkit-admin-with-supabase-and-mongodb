/**
 * Cookie 工具函数
 * 用于在客户端设置和管理 Cookie
 */

/**
 * 设置 Cookie
 * @param name - Cookie 名称
 * @param value - Cookie 值
 * @param days - 过期天数（默认 7 天）
 */
export function setCookie(name: string, value: string, days: number = 7): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  const cookieString = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;

  document.cookie = cookieString;
}

/**
 * 获取 Cookie
 * @param name - Cookie 名称
 * @returns Cookie 值或 null
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

/**
 * 删除 Cookie
 * @param name - Cookie 名称
 */
export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
