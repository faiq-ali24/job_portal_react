// Where the app and API live. Defaults match local development (lvh.me:3000 / lvh.me:3001).
// For production builds set REACT_APP_BASE_DOMAIN and leave the ports empty, e.g.
//   REACT_APP_BASE_DOMAIN=example.com REACT_APP_APP_PORT= REACT_APP_API_PORT= npm run build
export const BASE_DOMAIN = process.env.REACT_APP_BASE_DOMAIN || "lvh.me";
const APP_PORT = process.env.REACT_APP_APP_PORT ?? "3000";
const API_PORT = process.env.REACT_APP_API_PORT ?? "3001";

export const SECURE_COOKIES = window.location.protocol === "https:";

const origin = (port: string, subdomain?: string | number | null) =>
  `${window.location.protocol}//${subdomain ? `${subdomain}.` : ""}${BASE_DOMAIN}${port ? `:${port}` : ""}`;

// Frontend origin, optionally on a tenant subdomain: appBase(5) -> http://5.lvh.me:3000
export const appBase = (subdomain?: string | number | null) => origin(APP_PORT, subdomain);

// API origin, optionally on a tenant subdomain: apiBase(5) -> http://5.lvh.me:3001
export const apiBase = (subdomain?: string | number | null) => origin(API_PORT, subdomain);
