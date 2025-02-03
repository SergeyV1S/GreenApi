import React from "react";

import { ModalContext } from "./ModalContext";

export interface IModalProviderProps {
  children: React.ReactNode;
}

export const ModalContextProvider = ({ children }: IModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const value = React.useMemo(() => ({ isModalOpen, openModal, closeModal }), [isModalOpen]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
