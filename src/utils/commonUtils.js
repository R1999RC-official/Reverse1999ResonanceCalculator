export const url_safe_base64 = (src) => {
  return btoa(src).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
