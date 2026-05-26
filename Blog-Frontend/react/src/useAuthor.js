  import { create } from "zustand";
  import { createJSONStorage, persist } from "zustand/middleware";
  import axios from "axios";
  import { API_BASE_URL } from "./apiConfig";

  export const useAuth = create(
    persist(
      (set, get) => ({
        currentUser: null,
        loading: false,
        isAuthenticated: false,
        error: null,

        login: async (userCredWithRole) => {
          const { role, ...userCredObj } = userCredWithRole;
          try {
            set({ loading: true, error: null });
            const res = await axios.post(
              `${API_BASE_URL}/common-api/login`,
              userCredObj,
              { withCredentials: true }
            );

            const user = res.data?.payload ?? null;
            if (user) {
              localStorage.setItem("user", JSON.stringify(user));
            }

            set({
              loading: false,
              error: null,
              isAuthenticated: Boolean(user),
              currentUser: user,
            });
            return user;
          } catch (err) {
            set({
              loading: false,
              isAuthenticated: false,
              currentUser: null,
              error: err.response?.data?.message || "Login failed",
            });
            return null;
          }
        },

        checkAuth: async () => {
          const cachedUser = get().currentUser;
          if (cachedUser) {
            set({ isAuthenticated: true });
          }

          try {
            const res = await axios.get(`${API_BASE_URL}/common-api/check-auth`, {
              withCredentials: true,
            });

            const user = res.data?.payload ?? null;
            if (user) {
              localStorage.setItem("user", JSON.stringify(user));
            }

            set({
              currentUser: user,
              isAuthenticated: Boolean(user),
              loading: false,
              error: null,
            });
          } catch (err) {
            if (err.response?.status === 401) {
              localStorage.removeItem("user");
              set({
                currentUser: null,
                isAuthenticated: false,
                loading: false,
                error: null,
              });
              return;
            }

            set({
              loading: false,
              error: err.response?.data?.message || "Auth check failed",
            });
          }
        },

        logout: async () => {
          try {
            set({ loading: true, error: null });
            await axios.get(`${API_BASE_URL}/common-api/logout`, {
              withCredentials: true,
            });
          } catch (err) {
            set({ error: err.response?.data?.message || "Logout failed" });
          } finally {
            localStorage.removeItem("user");
            set({
              loading: false,
              isAuthenticated: false,
              currentUser: null,
            });
          }
        },
      }),
      {
        name: "blogapp-auth",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          currentUser: state.currentUser,
          isAuthenticated: state.isAuthenticated,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.isAuthenticated = Boolean(state.currentUser);
          }
        },
      }
    )
  );

