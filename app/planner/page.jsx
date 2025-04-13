'use client'
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation";

export default function Planner() {
  const router = useRouter();
  const [theme, setTheme] = useState("trees");
  const [plannerData, setPlannerData] = useState(
    Array(5).fill(null).map(() => Array(7).fill(""))
  );

  const themes = {
    trees: { bg: "#e7ebd0", border: "#8b906f" },
    ocean: { bg: "#bfe8ff", border: "#6f7f90" },
    sand: { bg: "#efd5b4", border: "#8f7f6f" },
  };

  const handleChange = (row, col, value) => {
    const updated = [...plannerData];
    updated[row][col] = value;
    setPlannerData(updated);
  };

  useEffect(()=>{
    const thm = localStorage.getItem("theme")
    if(!thm) return;
    setTheme(thm)
  },[])

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

      <div className="landscape-wrapper">
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
            onClick={() => document.getElementById("theme-menu").classList.toggle("hidden")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
          <div id="theme-menu" className="absolute left-0 mt-2 bg-white p-2 rounded shadow hidden z-50">
            {Object.keys(themes).map((t) => (
              <button
                key={t}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={() => {
                  setTheme(t);
                  localStorage.setItem("theme",t)
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
          {/* Heading */}
          <motion.h2
            key={theme}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-2xl font-semibold text-center -mt-10"
            style={{ fontFamily: "toon around" }}
          >
            Weekly Planner
          </motion.h2>

          <div className="overflow-x-auto w-full">
            <motion.table
              key={theme}
              className="border-collapse border w-full max-w-[85%] mx-auto"
              style={{ borderColor: themes[theme].border }}
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              transition={{
                duration: 0.8,
                delay: 1,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <thead>
                <motion.tr className="grid grid-cols-7">
                  {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map((day, index) => (
                    <motion.th
                      key={index}
                      className="border text-center font-normal h-7"
                      style={{ borderColor: themes[theme].border }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    >
                      <p style={{ fontFamily: "toon around" }} className="mt-1">{day}</p>
                    </motion.th>
                  ))}
                </motion.tr>
              </thead>
              <tbody>
                {plannerData.map((row, rowIndex) => (
                  <motion.tr
                    key={rowIndex}
                    className="grid grid-cols-7 h-7"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.5 + rowIndex * 0.2 }}
                  >
                    {row.map((cell, colIndex) => (
                      <motion.td
                        key={colIndex}
                        className="border text-center h-7 p-0"
                        style={{ borderColor: themes[theme].border }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.8 + colIndex * 0.1 }}
                      >
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                          className="w-full h-full text-center bg-transparent outline-none"
                          style={{ fontFamily: "toon around" }}
                        />
                      </motion.td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .landscape-wrapper {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media screen and (orientation: portrait) {
          .landscape-wrapper {
            transform: rotate(90deg);
            transform-origin: center center;
            width: 100vh;
            height: 100vw;
            overflow: hidden;
            position: absolute;
          }

          .absolute {
            position: fixed;
            z-index: 50;
          }
        }
      `}</style>
    </div>
  );
}
