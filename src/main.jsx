import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
// import "./styles/globals.css";
import "./index.css"
import { BrowserRouter } from "react-router-dom";
import { Sepolia } from "@thirdweb-dev/chains";
import { StateContextProvider } from "./context";
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = Spo;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        })
      ]}
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain={Sepolia}
    >
      <BrowserRouter>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);
