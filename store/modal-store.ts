import { Profile } from "@prisma/client";
import { create } from "zustand";

type ModalType = "createPost";

interface ModalStoreData {
  profile?: Profile;
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
    set(() => ({ isOpen: true, type, data })),
  onClose: () => set(() => ({ isOpen: false, data: null })),
}));
