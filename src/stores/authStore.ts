import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types";

interface DecodedToken {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (data: { token: string; user?: User }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      setAuth: ({ token, user }) => {
        let userData = user;
        if (!userData) {
          try {
            const decoded = jwtDecode<DecodedToken>(token);
            userData = {
              id: decoded.userId,
              email: decoded.email,
              firstName: decoded.firstName,
              lastName: decoded.lastName,
            };
          } catch (error) {
            console.error("Failed to decode JWT:", error);
            return;
          }
        }
        set({
          token,
          user: userData,
        });
      },

      logout: () =>
        set({
          token: null,
          user: null,
        }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => () => {
    },
    }
  )
);