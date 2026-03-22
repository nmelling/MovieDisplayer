import { format } from "date-fns";
import { fr } from "date-fns/locale";

// For now, file has few tools. Consider splitting it if becomes too big.
export function ensureError(err: unknown) {
  if (err instanceof Error) return err;
  if (err && typeof err === "object" && "message" in err && typeof err.message === "string") return new Error(err.message);
  return new Error(String(err));
}

export function formatDate(date: string) {
  if (!date) return date;
  return format(new Date(date), "dd/MM/yyyy", { locale: fr });
}

export function formatSrcImg(path: string) {
  return `https://image.tmdb.org/t/p/w200/${path}`;
}
