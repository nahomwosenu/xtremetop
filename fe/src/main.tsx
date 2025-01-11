import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";
import { AdvertProvider } from "./context/AdvertContext.tsx";
import { AdvertSlotProvider } from "./components/Servers/AdvertSlotContext.tsx";
import { GameProvider } from "./context/GameContext.tsx";
import { TranslationProvider } from "./context/TranslationContext.tsx";
import PartialDateInput from "./components/Test.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TranslationProvider>
      <AuthProvider>
        <ToastProvider>
          <AdvertProvider>
            <AdvertSlotProvider>
              <GameProvider>
                <App />
              </GameProvider>
            </AdvertSlotProvider>
          </AdvertProvider>
        </ToastProvider>
      </AuthProvider>
    </TranslationProvider>
  </StrictMode>
);
