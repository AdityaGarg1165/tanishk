'use client'
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation";

export default function TablePage() {
  const [theme, setTheme] = useState("trees");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const themes = {
    trees: { bg: "#e7ebd0", border: "#8b906f", graph: "yellow_graph.png", m: "yellow_tree", l: "yellow_coin1", r: "yellow_coin2" },
    ocean: { bg: "#e2f4f8", border: "#6f7f90", graph: "blue_graph.png", m: "blue_fish", l: "blue_coin1", r: "blue_coin2" },
    sand: { bg: "#efd5b4", border: "#8f7f6f", graph: "sand_graph.png", m: "sand_wheel", l: "sand_coin1", r: "sand_coin2" },
  };

  useEffect(() => {
    let thm = localStorage.getItem("theme");
    if (thm) setTheme(thm);

    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0a5ab9]">
        <h1 className="text-2xl font-bold animate-pulse" style={{ fontFamily: "Toon Around" }}>
          {/* Loading... */}
          <img src="/load.gif" alt="" />
        </h1>
      </div>
    );
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen relative px-4"
      style={{ backgroundColor: themes[theme].bg }}
    >
      {/* Theme Button */}
      <motion.div
        key={theme}
        className="absolute right-3 top-3"
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
        <div id="theme-menu" className="absolute right-0 mt-2 bg-white p-2 rounded shadow hidden z-50">
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

      <motion.div
        key={theme}
        className="flex flex-col absolute top-12 items-center gap-4 w-full max-w-screen-md px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Graph Image */}
        <motion.img
          key={theme}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          src={`/${themes[theme].graph}`}
          className="h-[18%] w-[80%] max-w-[100%] rounded-2xl"
          alt="Graph"
        />

        {/* Title */}
        <motion.h1
          key={theme}
          className={`text-2xl sm:text-3xl text-center font-semibold`}
          style={{ fontFamily: 'Toon Around', color: themes[theme].border }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          MONTHLY HOURS : XYZ
        </motion.h1>

        {/* Calendar Table */}
        <div className="overflow-x-auto w-full">
          <motion.table
            key={theme}
            className="border-collapse border w-full max-w-[70%] mx-auto"
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
                {Array.from({ length: 7 }).map((_, index) => (
                  <motion.th
                    key={index}
                    className="border text-center font-normal aspect-square"
                    style={{ borderColor: themes[theme].border }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  >
                    <p style={{ fontFamily: "toon around" }} className="mt-2">
                      {index + 1}
                    </p>
                  </motion.th>
                ))}
              </motion.tr>
            </thead>
            <tbody>
              {[
                ['8', '9', '10', '11', '12', '13', '14'],
                ['15', '16', '17', '18', '19', '20', '21'],
                ['22', '23', '24', '25', '26', '27', '28'],
                ['29', '30', '31', '', '', '', ''],
              ].map((row, rowIndex) => (
                <motion.tr
                  key={rowIndex}
                  className="grid grid-cols-7"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 + rowIndex * 0.2 }}
                >
                  {row.map((item, cellIndex) => (
                    <motion.td
                      key={cellIndex}
                      className="border text-center aspect-square"
                      style={{ borderColor: themes[theme].border }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.8 + cellIndex * 0.1 }}
                    >
                      <p className="mt-1" style={{ fontFamily: "toon around" }}>
                        {item}
                      </p>
                    </motion.td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        {/* Footer Icons with Buttons */}
        <div className="flex justify-center flex-wrap gap-4 max-w-[90%] mt-4">
          <motion.img
            key={theme}
            src={`/${themes[theme].l}.png`}
            className="max-w-[30%] h-auto"
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
          />
          <motion.img
            key={theme}
            src={`/${themes[theme].m}.png`}
            className="max-w-[30%] h-auto"
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          />
          <motion.div
            key={theme}
            className="relative max-w-[30%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.4 }}
          >
            <img
              src={`/${themes[theme].r}.png`}
              className="w-full h-auto"
              alt=""
            />
            <div
              className="absolute bottom-0 left-0 w-12 h-12 cursor-pointer"
              onClick={() => router.push("/planner")}
              title="Go to Planner"
            />
            <div
              className="absolute top-16 right-0 w-12 h-12 cursor-pointer"
              onClick={() => router.push("/tracker")}
              title="Go to Tracker"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
