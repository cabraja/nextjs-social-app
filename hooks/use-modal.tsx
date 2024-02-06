import { create } from "zustand";

type ModalType = "createBubble" | "deleteBubble" | "addBubbleImage";

type useModalProps = {
  isOpen: boolean;
  type: ModalType | null;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
};

const useModal = create<useModalProps>((set) => ({
  isOpen: false,
  type: null,
  onOpen: (type) => set(() => ({ isOpen: true, type: type })),
  onClose: () => set(() => ({ isOpen: false })),
}));

export default useModal;
