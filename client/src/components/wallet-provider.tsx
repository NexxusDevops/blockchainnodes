import { createContext, useContext, useState, ReactNode } from "react";

type WalletType = "keplr" | "leap" | null;

type WalletContextType = {
  isConnected: boolean;
  walletType: WalletType;
  address: string | null;
  connectWallet: (type: WalletType) => Promise<void>;
  disconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletType, setWalletType] = useState<WalletType>(null);
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async (type: WalletType) => {
    try {
      // Mock wallet connection for MVP
      // In production, integrate with actual WalletConnect SDK
      if (type === "keplr") {
        // Mock Keplr connection
        setAddress("cosmos1abc...xyz");
        setWalletType("keplr");
        setIsConnected(true);
      } else if (type === "leap") {
        // Mock Leap connection
        setAddress("cosmos1def...uvw");
        setWalletType("leap");
        setIsConnected(true);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
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
