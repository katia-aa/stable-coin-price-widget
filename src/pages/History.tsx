import React from "react";
import { useWallet } from "../wallet/WalletProvider";

const History: React.FC = () => {
  const { transactions } = useWallet();

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      <ul className="divide-y divide-gray-200">
        {transactions.map((tx) => (
          <li key={tx.id} className="py-2">
            <div className="text-sm text-gray-600">{new Date(tx.date).toLocaleString()}</div>
            <div className="text-sm break-all">To: {tx.to}</div>
            <div className="text-sm">Amount: ${tx.amountUsd.toFixed(2)}</div>
            <div className="text-sm capitalize">Status: {tx.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
