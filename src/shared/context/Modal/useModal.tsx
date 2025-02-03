import React from "react";

import { ModalContext } from "./ModalContext";

export const useModal = () => React.useContext(ModalContext);
