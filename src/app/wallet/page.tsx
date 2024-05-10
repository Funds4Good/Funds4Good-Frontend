"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Navbar from "@/components/Navbar";
import Address from "../../components/address";

export default function Home() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2"><Navbar page="Wallet" /></div>
      <div className="col-span-10 border hover:border-slate-900 rounded">
        <WalletMultiButton />
        <Address /> 
      </div>
    </div>
  );
}