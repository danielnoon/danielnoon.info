export const el = (selector, on) => {
  const results = (on || document).querySelectorAll(selector);

  if (results.length === 0) {
    return null;
  }

  if (results.length === 1) {
    return results[0];
  }

  return Array.from(results);
};
