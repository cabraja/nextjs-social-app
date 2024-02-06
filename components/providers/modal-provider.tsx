"use client";
import AddBubbleImageModal from "../modals/add-bubble-image";
import CreateBubbleModal from "../modals/create-bubble";

function ModalProvider() {
  return (
    <>
      <CreateBubbleModal />
      <AddBubbleImageModal />
    </>
  );
}

export default ModalProvider;
