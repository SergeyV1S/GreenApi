/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

interface IModalContext {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const ModalContext = React.createContext<IModalContext>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {}
});
