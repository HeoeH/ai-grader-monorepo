import { UserEntities } from "@ai-grader/entities";
import { differenceInDays } from "date-fns";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState extends Nullable<UserEntities.User> {
  _hasHydrated: boolean,
  reset: () => void;
  checkLoginExpire: () => boolean;
  setAuth: (role: UserEntities.RoleNameEnum) => void;
  _setHydrated: (state: boolean) => void,
}

const useAuth = create<AuthState>()(persist(
  (set, get) => ({
    role: null,
    lastLoginTime: null,
    _hasHydrated: false,
    reset: () => set({ role: null, lastLoginTime: null }),
    checkLoginExpire: () => {
      const last = get().lastLoginTime;
      if (!last) return true;
      return differenceInDays(new Date(last), new Date()) > 3;
    },
    setAuth: (role) => {
      set({ role, lastLoginTime: new Date().getTime() });
    },
    _setHydrated: (state) => {
      set({ _hasHydrated: state });
    }
  }),
  {
    name: "@ai-grader/auth-storage",
    storage: createJSONStorage(() => localStorage),
    onRehydrateStorage: () => (state) => {
      state?._setHydrated(true);
    }
  }
));

export default useAuth;