import React from "react";

import { IsMobileContext } from "./IsMobileContext";

export const useIsMobile = () => React.useContext(IsMobileContext);
