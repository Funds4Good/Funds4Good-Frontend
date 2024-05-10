import { Bookmark, HandCoins, Home, LogOut, Plus, User, Wallet } from "lucide-react";
import Image from "next/image";

export default function Navbar() {

  const navItems = [
    {
      icon: <Home />,
      name: "Home"
    },
    {
      icon: <Plus />,
      name: "Apply"
    },
    {
      icon: <HandCoins />,
      name: "Applications"
    },
    {
      icon: <Bookmark />,
      name: "Bookmarks"
    },
    {
      icon: <User />,
      name: "Profile"
    },
    {
      icon: <Wallet />,
      name: "Wallet"
    },
    {
      icon: <LogOut />,
      name: "Log Out"
    },
  ]

  return (
    <div className="w-full h-[100vh] sticky top-0 border-r-[#D9D9D9] border-2 py-8 px-4 bg-[#EEF1FF] flex flex-col gap-12">
      <div className="flex gap-2 items-center w-full mx-auto">
        <Image src={'/logo.png'} alt="logo" width={50} height={50} className="w-1/5" />
        <p className="text-2xl text-[#0000FF]">Funds4Good</p>
      </div>
      <div className="flex flex-col gap-2 mx-4">
        {navItems.map((item) =>
          <div className="flex gap-4 w-9/10 cursor-pointer text-black/60 hover:bg-[#4F46E5] hover:text-white p-4 rounded-xl">
            <div>{item.icon}</div>
            <p>{item.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
