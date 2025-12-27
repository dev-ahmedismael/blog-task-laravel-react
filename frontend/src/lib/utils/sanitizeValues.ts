export function sanitizeValues(input: any): any {
  if (input === null || input === undefined) return "";

  if (input instanceof File || input instanceof Blob) return input;

  if (Array.isArray(input)) {
    return input.map((item) => sanitizeValues(item));
  }

  if (typeof input === "object") {
    const sanitized: any = {};
    for (const key in input) {
      sanitized[key] = sanitizeValues(input[key]);
    }
    return sanitized;
  }

  return input;
}
