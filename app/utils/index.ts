// For now, file has few tools. Consider splitting it if becomes too big.
export function ensureError(err: unknown) {
  if (err instanceof Error) return err;
  if (err && typeof err === "object" && "message" in err && typeof err.message === "string") return new Error(err.message);
  return new Error(String(err));
}
