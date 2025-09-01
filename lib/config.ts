export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const BASE_URL = (authToken: string | null) => `${API_URL}?authToken=${authToken}`;