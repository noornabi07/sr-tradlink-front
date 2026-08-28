// Same-origin "/api" avoids CORS in dev (Vite proxy) and production (nginx reverse proxy).
export const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export default API_BASE_URL;
