import { Suspense } from "react";
import Header from "@/components/Header";

import ChatMessage from "@/components/ChatMessage";
import Model from "@/components/Model";

export default function Home() {
  return (
    <main className=" w-screen ">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />

        <div className=" flex">
          <div className="w-0 lg:w-2/5 h-[calc(100vh-4rem)]  mt-8">
            <Model />
          </div>
          <div className=" w-full lg:w-3/5">
            <ChatMessage />
          </div>
        </div>
      </Suspense>
    </main>
  );
}
