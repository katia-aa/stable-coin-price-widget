import React from "react";
import { Link } from "react-router-dom";
import { useWallet } from "../wallet/WalletProvider";

const Dashboard: React.FC = () => {
  const { walletAddress, user, transactions } = useWallet();
  const balanceUsd = transactions.reduce(
    (acc, t) => acc + (t.status === "confirmed" ? -t.amountUsd : 0),
    1000
  );

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Welcome {user?.email}</h1>
      <div className="mb-4">
        <div className="text-sm text-gray-600">Wallet:</div>
        <div className="break-all font-mono">{walletAddress}</div>
      </div>
      <div className="text-2xl font-semibold mb-4">Balance: ${balanceUsd.toFixed(2)}</div>
      <div className="flex gap-2 mb-4">
        <Link className="flex-1 bg-blue-500 text-white p-2 rounded text-center" to="/receive">Receive</Link>
        <Link className="flex-1 bg-green-500 text-white p-2 rounded text-center" to="/send">Send</Link>
      </div>
      <Link className="underline text-blue-600" to="/history">
        Transaction History
      </Link>
    </div>
  );
};

export default Dashboard;
