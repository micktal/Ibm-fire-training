import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root")!;
// Guard against HMR re-running this module and calling createRoot() twice
const root = (container as any).__reactRoot ?? createRoot(container);
(container as any).__reactRoot = root;
root.render(<App />);
