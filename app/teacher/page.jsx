'use client'
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation";

export default function Planner() {
  const router = useRouter();
  const [theme, setTheme] = useState("trees");
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const themes = {
    trees: { timer: "#999e75", bg: "#e7ebd0", border: "#8b906f",img:"yellow_tree.png" },
    ocean: { timer: "#a1c3d4", bg: "#e2f4f8", border: "#6f7f90",img:"blue_fish.png" },
    sand: { timer: "#d1b38d", bg: "#efd5b4", border: "#8f7f6f",img:"sand_wheel.png" },
  };

  useEffect(() => {
    const thm = localStorage.getItem("theme");
    if (!thm) return;
    setTheme(thm);
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen w-full relative overflow-hidden"
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
            document.getElementById("theme-menu").classList.toggle("hidden")
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
                document.getElementById("theme-menu").classList.add("hidden");
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        key={theme}
        className="flex flex-col items-center gap-4 w-full max-w-screen-md px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Study Timer Box */}
        <motion.div
          style={{ border: `6px solid ${themes[theme].timer}` }}
          className="w-64 h-80 rounded-2xl flex flex-col items-center"
        >
          <h1
            className="text-2xl text-center mt-2"
            style={{ fontFamily: "Toon Around" }}
          >
            STUDY TIMER
          </h1>
          <div
            className="divider w-full h-2 mt-2"
            style={{ backgroundColor: themes[theme].timer }}
          ></div>
          {theme === "ocean" ?
          <img className={`w-18 rotate-90`} src={`/${themes[theme].img}`} alt="" />
          :

            <img className={`w-14`} src={`/${themes[theme].img}`} alt="" />

        }
          <div
            className="w-36 h-16 mt-1 rounded-2xl"
            style={{ border: `6px ${themes[theme].timer} solid` }}
          >
            <h1
              className="text-4xl ml-8 mt-1.5"
              style={{ fontFamily: "Toon Around" }}
            >
              {formatTime(seconds)}
            </h1>
          </div>
          <div
            className="w-20 h-12 mt-4 bg-[#e4f1f9] rounded-3xl flex items-center justify-center cursor-pointer"
            style={{ border: `6px ${themes[theme].timer} solid` }}
            onClick={() => setIsRunning((prev) => !prev)}
          >
            <h1
              style={{ fontFamily: "Toon Around" }}
              className="text-xl"
            >
              {isRunning ? "STOP" : "START"}
            </h1>
          </div>
        </motion.div>

        {/* Other Planner Content */}
        <div className="overflow-x-auto w-full">
          {/* Add more planner stuff here if needed */}
        </div>
      </motion.div>
    </div>
  );
}
