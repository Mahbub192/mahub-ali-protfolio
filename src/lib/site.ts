export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function sitePath(path: string) {
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  const hashAt = path.indexOf("#");
  const hash = hashAt >= 0 ? path.slice(hashAt) : "";
  let pathname = hashAt >= 0 ? path.slice(0, hashAt) : path;

  if (!pathname) pathname = "/";
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;

  const isFile = /\.[a-z0-9]+$/i.test(pathname);
  if (pathname !== "/" && !pathname.endsWith("/") && !isFile) {
    pathname = `${pathname}/`;
  }

  return `${basePath}${pathname}${hash}`;
}
