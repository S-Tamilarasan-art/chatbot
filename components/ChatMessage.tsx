"use client";
import { v4 as uuidv4 } from "uuid";
import {
  X,
  Expand,
  Send,
  Mic,
  Paperclip,
  EllipsisVertical,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

type ChatMessage = {
  dateTime: string;
  sender: "user" | "bot";
  text: string;
};
export default function ChatMessage() {
  const [userInput, setUserInput] = useState("");
  const [count, setCount] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [messages, setMessages] = useState<{ id: string; text: string }[]>([]);
  const [chatmeassages, setChatMessages] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  var lineCount = userInput.split(/\r?\n/).length;
  const [id, setId] = useState<string | null>("");

  useEffect(() => {
    let storedId = localStorage.getItem("sessionId");
    console.log("from local storage", storedId);
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("sessionId", storedId);
    }

    setId(storedId);

    const getHistory = async () => {
      const response = await fetch(`api/getdata?sessionId=${storedId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const getData = await response.json();
      setChatMessages(getData.data.messages || []);
      console.log("AWS Response:", getData);
    };
    getHistory();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    extractDate(chatmeassages);
  }, [chatmeassages, messages]);

  async function user() {
    if (userInput.trim() !== "") {
      const newMessage = {
        id: (count + 1).toString(),
        text: currentInput,
      };
      lineCount = 0;

      const saveMessages = async () => {
        const payload = {
          message: currentInput,
          dateTime: new Date().toString(),
          sessionId: id,
          EnteredBy: "user",
        };
        console.log(payload);
        try {
          const res = await fetch(`api/storedata`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          console.log("Status:", res.status);

          if (res.status == 200) {
            setUserInput("");
          }
        } catch (error) {
          console.error("Fetch failed:", error);
        } finally {
        }
      };
      await saveMessages();
      setMessages([...messages, newMessage]);
      setCount(count + 1);
    }
  }

  function convertToShortTime(fullTime: string) {
    const date = new Date(fullTime);

    let hours = date.getHours();
    let minutes = date.getMinutes().toString();

    // AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;

    // Pad minutes
    minutes = minutes.toString().padStart(2, "0");

    return `${hours}:${minutes} ${ampm}`;
  }

  function extractDate(messagedate: any) {
    let date: any = new Date(messagedate);
    date = date.toDateString();
    let currentDate: any = new Date();
    currentDate = currentDate.toDateString();
    if (date == currentDate) {
      return "Today";
    }

    return date;
  }

  const messagesByDate: any = {};

  chatmeassages.forEach((msg) => {
    const date = extractDate(msg.dateTime);

    if (!messagesByDate[date]) {
      messagesByDate[date] = [];
    }
    messagesByDate[date].push(msg);
  });

  return (
    <main>
      <div
        className={`  flex flex-col overflow-y-scroll h-screen justify-between 
        cursor-auto fixed top-0 right-0 size-full  bg-gray-50  bg-[url('/bg-image.jpeg')] `}
      >
        <header className="z-index  w-full h-12 bg-stone-50 shadow fixed top-0 flex  flex-wrap items-center justify-between ">
          <div className="mx-4 flex gap-2 items-center ">
            <div className="size-10 rounded-full bg-gray-200 border-gray-50 border "></div>
            <span className="font-bold ">SoftMania</span>
          </div>
          <EllipsisVertical className="mx-4" />
        </header>
        {/* USER ENTERING TEXT */}
        <div className=" w-[95%] mx-auto  mt-14 mb-30 flex flex-col flex-wrap gap-3 items-end lg:w-[70%]">
          {/* DATE STAMP */}

          {Object.keys(messagesByDate).map((date) => (
            <div key={date} className="w-full ">
              <div className="w-full  flex justify-center my-2">
                <span className="bg-yellow-50 border text-[.8rem] font-bold text-gray-800 rounded-sm p-px">
                  {date}
                </span>
              </div>

              {messagesByDate[date].map((m: any, index: number) => (
                <div
                  key={index}
                  className={`flex my-2 w-full  ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <p
                    className={`rounded-lg max-w-[70%] border p-1 
          ${m.sender === "user" ? "bg-gray-50 text-left" : "bg-slate-100 text-left"}  
        `}
                  >
                    {m.text}

                    <p className="text-[.7rem]  text-gray-600 text-right">
                      {convertToShortTime(m.dateTime) + " "}
                    </p>
                  </p>
                </div>
              ))}
            </div>
          ))}
          {messages.map((m) => (
            <p
              key={m.id}
              id={m.id}
              className=" bg-blue-100  rounded-lg max-w-[85%] w-min-auto B border p-1 h-fit  wrap-break-word "
            >
              {m.text}
            </p>
          ))}
        </div>
        <div ref={bottomRef}></div>
        {/* INPUT FIELD */}
        <footer
          className={`bg-[url('/bg-image.jpeg')] z-20 w-[99%] max-h-[10lh] h-18 fixed bottom-0 `}
        >
          <div
            className={`z-60 flex flex-row  flex-wrap  overflow-y-visible items-center
       justify-between fixed  bottom-5 left-1/2 -translate-x-1/2     ring-1 ring-gray-400 
       rounded-lg w-[95%] max-h-[10lh] min-h-[lh]  bg-white p-2 lg:max-w-[70%]   ${
         lineCount > 1 ? "flex-col justify-between items-end " : " "
       } `}
          >
            {/* INPUT FIELD */}
            <textarea
              name="input"
              id="input "
              rows={lineCount}
              ref={textAreaRef}
              placeholder="Describe what you need..."
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
                setCurrentInput(e.target.value);
                console.log(lineCount);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.shiftKey) {
                  e.preventDefault();
                  setUserInput(`${userInput}` + `\n`);
                  return;
                }
                if (e.key === "Enter") {
                  e.preventDefault();
                  user();
                }
              }}
              className={`bg-white  min-w-[80%] min-h-[1/2lh]  max-h-[8lh] rounded-lg 
            resize-none placeholder:text-sm p-2 font-light focus:outline-none field-sizing-content 
            ${lineCount > 1 ? "w-full outline-none " : "outline-none"}
            `}
            ></textarea>
            {/* SEND BUTTON */}
            <div
              className={`rounded-full size-9 border   ${
                userInput.trim() !== ""
                  ? "bg-green-900 text-white  shadow-[0_0_15px_3px_rgba(34,197,94,0.9)] ring-2 ring-green-500 "
                  : ""
              } `}
            >
              <Send
                className={`size-8 p-1 mt-1 cursor-not-allowed  ${userInput.trim() !== "" ? "animate-pulse cursor-pointer" : ""}`}
                onClick={user}
              />
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
