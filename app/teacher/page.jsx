'use client'
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation";

export default function Planner() {
  const router = useRouter();
  const [theme, setTheme] = useState("trees");
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const themes = {
    trees: { timer: "#999e75", bg: "#e7ebd0", border: "#8b906f", img: "yellow_tree.png" },
    ocean: { timer: "#a1c3d4", bg: "#e2f4f8", border: "#6f7f90", img: "blue_fish.png" },
    sand: { timer: "#d1b38d", bg: "#efd5b4", border: "#8f7f6f", img: "sand_wheel.png" },
  };

  useEffect(() => {
    const thm = localStorage.getItem("theme");
    if (thm) setTheme(thm);
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setSeconds(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, input]);
    setInput("");
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{ backgroundColor: themes[theme].bg }}
    >
      {/* Back Button */}
      <motion.button
        className="absolute top-3 right-3 bg-white px-3 py-1 rounded shadow text-sm"
        onClick={() => router.back()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ fontFamily: "toon around" }}
      >
        ← Back
      </motion.button>

      {/* Theme Switcher */}
      <motion.div
        key={theme}
        className="absolute left-3 top-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer"
          onClick={() =>
            document.getElementById("theme-menu")?.classList.toggle("hidden")
          }
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
        <div
          id="theme-menu"
          className="absolute left-0 mt-2 bg-white p-2 rounded shadow hidden z-50"
        >
          {Object.keys(themes).map((t) => (
            <button
              key={t}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() => {
                setTheme(t);
                localStorage.setItem("theme", t);
                document.getElementById("theme-menu")?.classList.add("hidden");
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-4 p-4 pt-16">
        {/* Teacher List */}
        <div
          className="border-2 p-4 rounded-md w-full md:w-[180px] flex-shrink-0"
          style={{ fontFamily: "Toon Around" }}
        >
          <h1 className="text-center font-bold text-xl">TEACHERS</h1>
          <ul className="flex flex-col gap-4 mt-8 list-disc list-inside text-sm">
            <li>Maths</li>
            <li>Biology</li>
            <li>Chemistry</li>
            <li>Physics</li>
            <li>Business</li>
            <li>P.E</li>
            <li>Add More +</li>
          </ul>
        </div>

        {/* Chatbox */}
        <div className="border-2 flex-1 flex flex-col rounded-md max-h-[85vh]">
          <h1 className="ml-2 mt-2 underline" style={{ fontFamily: "Toon Around" }}>
            Open Chat
          </h1>
          <div className="flex-1 overflow-auto p-2 space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className="bg-white rounded p-2 shadow w-fit max-w-[80%]">
                {msg}
              </div>
            ))}
          </div>
          <div className="flex p-2 gap-2 items-center">
  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    type="text"
    className="w-full sm:w-[calc(100%-80px)] rounded-2xl border-2 h-10 px-4"
    placeholder="Type your message..."
  />
  <button
    onClick={handleSend}
    className="w-[70px] rounded-2xl border-2 h-10 flex items-center justify-center"
    style={{ fontFamily: "Toon Around" }}
  >
    SEND
  </button>
</div>

        </div>
      </div>
    </div>
  );
}
