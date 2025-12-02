import Image from "next/image";

import ChatMessage from "@/components/ChatMessage";
import { Suspense } from "react";
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatMessage />;
    </Suspense>
  );
}
