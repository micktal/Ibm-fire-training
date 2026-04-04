import { createRoot } from "react-dom/client";
import { builder } from "@builder.io/react";
import App from "./App";

// Initialisation Builder.io — clé publique de l'espace IBM Fire Training
builder.init("d93d9a0ec7824aa1ac4d890a1f90a2ec");

const container = document.getElementById("root")!;
// Guard against HMR re-running this module and calling createRoot() twice
const root = (container as any).__reactRoot ?? createRoot(container);
(container as any).__reactRoot = root;
root.render(<App />);
