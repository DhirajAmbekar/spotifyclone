import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import App from "./App.jsx";
import { MusicProvider } from "./context/MusicContext.jsx";

createRoot(document.getElementById("root")).render(
  <MusicProvider>
    <App />
  </MusicProvider>
);
