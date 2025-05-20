import React, { createContext, useContext, useEffect, useState } from "react";

export type User = {
  email: string;
};

export type Transaction = {
  id: string;
  date: string;
  to: string;
  amountUsd: number;
  status: "pending" | "confirmed" | "failed";
};

export type WalletContextType = {
  user: User | null;
  walletAddress: string | null;
  transactions: Transaction[];
  signUp: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  send: (to: string, amountUsd: number) => Promise<void>;
  refreshTransactions: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

function randomHex(bytes: number): string {
  const chars = "0123456789abcdef";
  let hex = "";
  for (let i = 0; i < bytes * 2; i++) {
    hex += chars[Math.floor(Math.random() * 16)];
  }
  return hex;
}

function generateAddress(): string {
  return `0x${randomHex(20)}`;
}

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedWallet = localStorage.getItem("walletAddress");
    const storedTxs = localStorage.getItem("transactions");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedWallet) setWalletAddress(storedWallet);
    if (storedTxs) setTransactions(JSON.parse(storedTxs));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (walletAddress) localStorage.setItem("walletAddress", walletAddress);
  }, [walletAddress]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const signUp = (email: string, _password: string) => {
    const newUser = { email };
    setUser(newUser);
    setWalletAddress(generateAddress());
  };

  const login = (email: string, _password: string) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && JSON.parse(storedUser).email === email) {
      setUser({ email });
      const storedWallet = localStorage.getItem("walletAddress");
      if (storedWallet) setWalletAddress(storedWallet);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const send = async (to: string, amountUsd: number) => {
    const tx: Transaction = {
      id: Math.random().toString(36).slice(2),
      date: new Date().toISOString(),
      to,
      amountUsd,
      status: "pending",
    };
    setTransactions((t) => [...t, tx]);
    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((p) =>
          p.id === tx.id ? { ...p, status: "confirmed" } : p
        )
      );
    }, 1000);
  };

  const refreshTransactions = async () => {
    // Placeholder for fetching from provider like Covalent or Alchemy
    return Promise.resolve();
  };

  const value: WalletContextType = {
    user,
    walletAddress,
    transactions,
    signUp,
    login,
    logout,
    send,
    refreshTransactions,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("WalletProvider missing");
  return ctx;
}
