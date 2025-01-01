import axios from 'axios';
import { create } from 'zustand';

interface UserProfile {
    email: string;
    nickname: string;
}

export interface UserProfileStore {
    getUserProfile: () => Promise<{ success: boolean; data: UserProfile; message: string }>;
}

export const useUserProfileStore = create<UserProfileStore>(() => ({
    getUserProfile: async () => {
        try {
            const res = await axios.get('/api/users/profile');
            return res.data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return { success: false, message: err.response?.data?.message || err.request };
            } else {
                return { success: false, message: 'Failed to fetch user profile' };
            }
        }
    },
}));
