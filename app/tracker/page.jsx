'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion'

export default function Tracker() {
  const router = useRouter();
  const [theme, setTheme] = useState("yellow");
  const [tableData, setTableData] = useState(
    Array.from({ length: 8 }, () => ({
      assessment: "",
      actual: "",
      predicted: "",
      comments: "",
    }))
  );

  const themes = {
    yellow: { bg: "#e7ebd0", border: "#8b906f" },
    blue: { bg: "#e2f4f8", border: "#6f7f90" },
    sand: { bg: "#efd5b4", border: "#8f7f6f" },
  };

  const headers = ["Assessment", "Actual %", "Predicted %", "Comments"];

  const handleChange = (rowIdx, key, value) => {
    const updated = [...tableData];
    updated[rowIdx][key] = value;
    setTableData(updated);
  };

  return (
    <div
      className="flex justify-center items-start py-10 min-h-screen w-full relative overflow-hidden"
      style={{ backgroundColor: themes[theme].bg }}
    >
      {/* Back Button */}
      <motion.button
        onClick={() => router.back()}
        className="absolute left-3 top-3 bg-white border px-3 py-1 rounded shadow"
        style={{ fontFamily: "toon around", borderColor: themes[theme].border }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        ← Back
      </motion.button>

      {/* Theme Toggle Button */}
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
          onClick={() => document.getElementById("theme-menu")?.classList.toggle("hidden")}
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
                document.getElementById("theme-menu")?.classList.add("hidden");
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        key={theme}
        className="flex flex-col items-center gap-4 w-full max-w-screen-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.h2
          key={theme}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-2xl font-semibold text-center"
          style={{ fontFamily: "toon around" }}
        >
          Grade Tracker
        </motion.h2>

        <div className="overflow-x-auto w-full">
          <motion.table
            key={theme}
            className="border-collapse border w-full mx-auto"
            style={{ borderColor: themes[theme].border }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <thead>
              <tr className="grid grid-cols-4">
                {headers.map((header, i) => (
                  <th
                    key={i}
                    className="border text-center font-medium h-8"
                    style={{ borderColor: themes[theme].border, fontFamily: "toon around" }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIdx) => (
                <tr key={rowIdx} className="grid grid-cols-4">
                  {headers.map((key, colIdx) => {
                    const colKey = key.toLowerCase().replace(/\s/g, '');
                    return (
                      <td
                        key={colIdx}
                        className="border text-center p-1"
                        style={{ borderColor: themes[theme].border }}
                      >
                        <input
                          type="text"
                          value={row[colKey]}
                          onChange={(e) => handleChange(rowIdx, colKey, e.target.value)}
                          className="w-full bg-transparent outline-none text-center"
                          style={{ fontFamily: "toon around" }}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </motion.div>
    </div>
  );
}
