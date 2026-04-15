export type SavedDraw = {
  id: string;
  name: string;
  dataUrl: string;
  createdAt: string;
};

const USER_KEY = "sketchflow_user";
const DRAW_KEY = "sketchflow_draws";

export const storage = {
  getUser: () => (typeof window === "undefined" ? null : localStorage.getItem(USER_KEY)),
  setUser: (value: string) => localStorage.setItem(USER_KEY, value),
  clearUser: () => localStorage.removeItem(USER_KEY),
  getDraws: (): SavedDraw[] => {
    const raw = localStorage.getItem(DRAW_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as SavedDraw[];
    } catch {
      return [];
    }
  },
  saveDraws: (draws: SavedDraw[]) => localStorage.setItem(DRAW_KEY, JSON.stringify(draws))
};
