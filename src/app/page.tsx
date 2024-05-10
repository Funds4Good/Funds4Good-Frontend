import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import Stories from "@/components/Stories";

export default function Home() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2"><Navbar page="Home" /></div>
      <div className="col-span-7"><Post /></div>
      <div className="col-span-3"><Stories /></div>
    </div>
  );
}
