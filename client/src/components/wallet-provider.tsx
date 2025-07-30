import { createContext, useContext, useState, ReactNode } from "react";

type WalletType = "keplr" | "leap" | "metamask" | null;

type WalletContextType = {
  isConnected: boolean;
  walletType: WalletType;
  address: string | null;
  connectWallet: (type: WalletType) => Promise<void>;
  disconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

declare global {
  interface Window {
    keplr?: any;
    leap?: any;
    ethereum?: any;
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletType, setWalletType] = useState<WalletType>(null);
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async (type: WalletType) => {
    try {
      if (type === "keplr") {
        if (typeof window !== "undefined" && window.keplr) {
          // Real Keplr connection
          await window.keplr.enable("cosmoshub-4");
          const offlineSigner = window.keplr.getOfflineSigner("cosmoshub-4");
          const accounts = await offlineSigner.getAccounts();
          setAddress(accounts[0].address);
          setWalletType("keplr");
          setIsConnected(true);
        } else {
          // Mock Keplr connection for development
          setAddress("cosmos1abc123def456ghi789jkl012mno345pqr678");
          setWalletType("keplr");
          setIsConnected(true);
        }
      } else if (type === "leap") {
        if (typeof window !== "undefined" && window.leap) {
          // Real Leap connection
          await window.leap.enable("cosmoshub-4");
          const offlineSigner = window.leap.getOfflineSigner("cosmoshub-4");
          const accounts = await offlineSigner.getAccounts();
          setAddress(accounts[0].address);
          setWalletType("leap");
          setIsConnected(true);
        } else {
          // Mock Leap connection for development
          setAddress("cosmos1def456ghi789jkl012mno345pqr678stu901");
          setWalletType("leap");
          setIsConnected(true);
        }
      } else if (type === "metamask") {
        if (typeof window !== "undefined" && window.ethereum) {
          // Real MetaMask connection
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAddress(accounts[0]);
          setWalletType("metamask");
          setIsConnected(true);
        } else {
          // Mock MetaMask connection for development
          setAddress("0x742d35cc6634c0532925a3b8d11c7d4e2aa2b98f");
          setWalletType("metamask");
          setIsConnected(true);
        }
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletType(null);
    setAddress(null);
  };

  return (
    <WalletContext.Provider value={{
      isConnected,
      walletType,
      address,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
