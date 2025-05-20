import React from "react";
import { useWallet } from "../wallet/WalletProvider";
import QRCode from "qrcode.react";

const Receive: React.FC = () => {
  const { walletAddress } = useWallet();
  const link = `${window.location.origin}/pay/${walletAddress}`;

  if (!walletAddress) return null;

  return (
    <div className="p-4 max-w-sm mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Receive Funds</h1>
      <div className="mb-4 break-all font-mono">{walletAddress}</div>
      <div className="flex justify-center mb-4">
        <QRCode value={walletAddress} />
      </div>
      <div className="text-sm">Shareable link:</div>
      <a href={link} className="text-blue-600 underline break-all">
        {link}
      </a>
    </div>
  );
};

export default Receive;
