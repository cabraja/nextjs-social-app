import { create } from "zustand";

type ModalType = "createBubble" | "deleteBubble" | "addBubbleImage";

type PropsData = {
  bubbleId?: string;
  fileUrl?: string;
};

type useModalProps = {
  isOpen: boolean;
  type: ModalType | null;
  onOpen: (type: ModalType, data?: PropsData) => void;
  onClose: () => void;
  data: PropsData;
};

const useModal = create<useModalProps>((set) => ({
  isOpen: false,
  type: null,
  data: {},
  onOpen: (type, data = {}) =>
    set(() => ({ isOpen: true, type: type, data: data })),
  onClose: () => set(() => ({ isOpen: false })),
}));

export default useModal;
