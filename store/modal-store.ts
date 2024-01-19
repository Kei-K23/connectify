import { PostWithProfile } from "@/type";
import { Profile } from "@prisma/client";
import { create } from "zustand";

type ModalType = "createPost" | "editPost" | "deletePost";

interface ModalStoreData {
  profile?: Profile;
  confirm?: boolean;
  post?: PostWithProfile;
}

interface UseModalStore {
  isOpen: boolean;
  data?: ModalStoreData | null;
  type: ModalType | "";
  onOpen: ({ type, data }: { type: ModalType; data?: ModalStoreData }) => void;
  onClose: () => void;
}

export const useModalStore = create<UseModalStore>((set) => ({
  isOpen: false,
  type: "",
  data: null,
  onOpen: ({ type, data }: { type: ModalType; data?: ModalStoreData }) =>
    set(() => {
      return { isOpen: true, type, data };
    }),
  onClose: () => set(() => ({ isOpen: false, data: null })),
}));
