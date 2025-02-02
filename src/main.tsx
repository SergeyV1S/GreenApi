import "@ant-design/v5-patch-for-react-19";
import { createRoot } from "react-dom/client";

import { Providers } from "@app/providers";

import "./assets/index.css";

createRoot(document.getElementById("root")!).render(<Providers />);
