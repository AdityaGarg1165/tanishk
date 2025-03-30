'use client'
import { useState } from "react";

export default function TablePage() {
  const [theme, setTheme] = useState("yellow");
  const themes = {
    yellow: { bg: "#e7ebd0", border: "#8b906f",graph:"yellow_graph.png",m:"yellow_tree",l:"yellow_coin1",r:"yellow_coin2" },
    blue: { bg: "#e2f4f8", border: "#6f7f90",graph:"blue_graph.png",m:"blue_fish",l:"blue_coin1",r:"blue_coin2" },
    sand: { bg: "#efd5b4", border: "#8f7f6f" ,graph:"sand_graph.png",m:"sand_wheel",l:"sand_coin1",r:"sand_coin2" },
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen relative px-4"
      style={{ backgroundColor: themes[theme].bg }}
    >
      <div className="absolute right-3 top-3">
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
                document.getElementById("theme-menu").classList.add("hidden");
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col absolute top-12 items-center -space-y-12 w-full max-w-screen-md">
        <img src={`/${themes[theme].graph}`} className="h-[18%] w-[80%] max-w-[100%] rounded-2xl" alt="Background" />
        <div className="overflow-x-auto w-full mt-20">
          <table
            className="border-collapse border w-full max-w-[70%] mx-auto"
            style={{ borderColor: themes[theme].border }}
          >
            <thead>
              <tr className="grid grid-cols-7">
                {Array.from({ length: 7 }).map((_, index) => (
                  <th key={index} className="border text-center font-normal aspect-square" style={{ borderColor: themes[theme].border }}>
                    {index + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['8', '9', '10', '11', '12', '13', '14'],
                ['15', '16', '17', '18', '19', '20', '21'],
                ['22', '23', '24', '25', '26', '27', '28'],
                ['29', '30', '31', '', '', '', ''],
              ].map((row, rowIndex) => (
                <tr key={rowIndex} className="grid grid-cols-7">
                  {row.map((item, cellIndex) => (
                    <td key={cellIndex} className="border text-center aspect-square" style={{ borderColor: themes[theme].border }}>
                      {item}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex mt-20 justify-center flex-wrap gap-4 max-w-[90%]">
          <img src={`/${themes[theme].l}.png`} className="max-w-[30%] h-auto" alt="" />
          <img src={`/${themes[theme].m}.png`} className="max-w-[30%] h-auto" alt="" />
          <img src={`/${themes[theme].r}.png`} className="max-w-[30%] h-auto" alt="" />
        </div>
      </div>
    </div>
  );
}
