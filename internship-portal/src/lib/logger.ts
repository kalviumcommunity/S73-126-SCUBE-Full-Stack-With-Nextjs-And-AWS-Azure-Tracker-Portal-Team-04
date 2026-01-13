export function log(level: "info" | "warn" | "error", message: string, meta: any = {}) {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      ...meta,
    })
  );
}

export const logInfo = (msg: string, meta?: any) => log("info", msg, meta);
export const logError = (msg: string, meta?: any) => log("error", msg, meta);
export const logWarn = (msg: string, meta?: any) => log("warn", msg, meta);
    