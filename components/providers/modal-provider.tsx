"use client";
import AddBubbleImageModal from "../modals/add-bubble-image";
import CreateBubbleModal from "../modals/create-bubble";
import CreatePostModal from "../modals/create-post";

function ModalProvider() {
  return (
    <>
      <CreateBubbleModal />
      <AddBubbleImageModal />
      <CreatePostModal />
    </>
  );
}

export default ModalProvider;
