import { XIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import { useModal } from "@shared/context";

const modalElement = document.getElementById("modal") as HTMLElement;

interface IModalOverlayProps {
  closeModal: () => void;
}

const ModalOverlay = ({ closeModal }: IModalOverlayProps) => (
  <div
    className='absolute left-0 right-0 bg-black opacity-70 min-h-screen min-w-full z-50'
    onClick={closeModal}
  />
);

interface IModalProps {
  children: ReactNode;
}

export const Modal = ({ children }: IModalProps) => {
  const { closeModal } = useModal();

  useEffect(() => {
    const checkEscapeButton = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", checkEscapeButton);

    return () => {
      document.removeEventListener("keydown", checkEscapeButton);
    };
  }, []);

  return createPortal(
    <menu
      type='popup'
      className='fixed flex items-center justify-center min-w-full min-h-full top-0 left-0 z-50'
    >
      <ModalOverlay closeModal={closeModal} />
      <div className='relative rounded-3xl size-96 z-50 bg-white'>
        <button className='absolute right-7 top-7 hover:cursor-pointer' onClick={closeModal}>
          <XIcon />
        </button>
        {children}
      </div>
    </menu>,
    modalElement
  );
};
