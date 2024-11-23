import { create } from "zustand";

export const useUserStore = create((set) => ({
    users: [],
    setUsers: (user) => set({ users: user }),
    createUser: async (newUser) => {
        if (!newUser.name || !newUser.nickname || !newUser.email || !newUser.password || !newUser.confirmPassword || (newUser.password !== newUser.confirmPassword)) {
            return { success: false, message: "Confirm that all fields are right!" };
        }
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                const errorText = await response.text();
                return { success: false, message: `Error: ${errorText}` };
            }

            const data = await response.json();
            set((state) => ({ users: [...state.users, data.data] }));
            return { success: true, message: "Successfully submitted!" };
        } catch (error) {
            return { success: false, message: `Error: ${error.message}` };
        }
    }
}));
