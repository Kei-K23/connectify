import {
  BlockerWithBlocking,
  FollowerWithFollowing,
  FollowingWithFollower,
  PostWithAll,
  ProfileWithAll,
  ReplyWithAll,
} from "@/type";
import { Profile } from "@prisma/client";
import { create } from "zustand";

type ModalType =
  | "createPost"
  | "editPost"
  | "deletePost"
  | "replyPost"
  | "mutePost"
  | "followUser"
  | "editProfile"
  | "followersModal"
  | "followingsModal";

interface ModalStoreData {
  profile?: ProfileWithAll;
  confirm?: boolean;
  post?: PostWithAll;
  data?: PostWithAll | ReplyWithAll;
  followings?: FollowerWithFollowing[];
  followers?: FollowingWithFollower[];
  blockings?: BlockerWithBlocking[];
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
