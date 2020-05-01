export const wait = (ms) => new Promise((res) => setTimeout(res, ms));

export const redirect = (url) => (document.location.href = url);
