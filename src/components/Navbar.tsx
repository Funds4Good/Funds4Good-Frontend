"use client"

import { Bookmark, HandCoins, Home, LogOut, Plus, User, Wallet } from "lucide-react";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  page: string
}

export default function Navbar({ page }: Props) {

  const [accessToken, setAccessToken] = useState<string | null>("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("accessToken");
      if (token != undefined && token)
        setAccessToken(token);
      else
        router.replace("/signin")
    }
  }, [accessToken]);

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
  ]

  function buttonClasses(item: string) {
    return classNames(
      {
        "bg-[#4F46E5]": page == item,
        "text-white": page == item,
      },
    );
  }

  return (
    <div className="w-full h-[100vh] sticky top-0 border-r-[#D9D9D9] border-2 py-8 px-4 bg-[#EEF1FF] flex flex-col gap-12">
      <div className="flex gap-2 items-center w-full mx-auto">
        <Image src={'/logo.png'} alt="logo" width={50} height={50} className="w-1/5" />
        <p className="text-2xl text-[#0000FF]">Funds4Good</p>
      </div>
      <div className="flex flex-col gap-2 mx-4">
        {navItems.map((item) =>
          <Link href={`/${item.name == "Home" ? "" : (item.name).toLowerCase()}`} className={`${buttonClasses(item.name)} flex gap-4 w-9/10 cursor-pointer text-black/60 hover:bg-[#D9D9D999]/60 hover:text-black p-4 rounded-xl`}>
            <div>{item.icon}</div>
            <p>{item.name}</p>
          </Link>
        )}
        {accessToken && <div onClick={() => { localStorage.removeItem("accessToken"); setAccessToken("") }} className={`${buttonClasses("Logout")} flex gap-4 w-9/10 cursor-pointer text-black/60 hover:bg-[#D9D9D999]/60 hover:text-black p-4 rounded-xl`}>
          <div><LogOut /></div>
          <p>Logout</p>
        </div>}
      </div>
    </div>
  );
}
