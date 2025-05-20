import React, { useState } from "react";
import { useWallet } from "../wallet/WalletProvider";
import { useNavigate } from "react-router-dom";

const Send: React.FC = () => {
  const { send } = useWallet();
  const navigate = useNavigate();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);
  const [confirm, setConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm) {
      setConfirm(true);
      return;
    }
    await send(to, amount);
    navigate("/dashboard");
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Send Funds</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="border p-2 rounded"
          placeholder="Recipient Address"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 rounded"
          placeholder="Amount (USD)"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button className="bg-green-500 text-white p-2 rounded" type="submit">
          {confirm ? "Confirm" : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Send;
