import * as React from "react";

import { CursorType } from "../types";

interface SelectProps {
  activeType: CursorType;
  setCursorType: (value: React.SetStateAction<CursorType>) => void;
}

const cursorTypes: CursorType[] = [
  "rotation",
  "game",
  "handshake",
  "polonaise",
];

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Select: React.FC<SelectProps> = ({ activeType, setCursorType }) => {
  return (
    <div>
      <span className="relative z-0 inline-flex shadow-sm rounded-md">
        {cursorTypes.map((c: CursorType, index) => {
          // Check if cursor type is defined
          if (c === undefined) return null;

          // Uppercase first letter
          const name = capitalizeFirstLetter(c);
          console.log(c, index);
          

          // Left button
          if (index === 0)
            return (
              <button
                type="button"
                onClick={() => setCursorType(c)}
                className={`relative inline-flex items-center px-4 py-2 rounded-l-md border ${
                  activeType === c
                    ? "text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                    : "text-gray-700 bg-white hover:bg-gray-50"
                } border-gray-300 text-sm font-medium focus:z-10 focus:outline-none`}
              >
                {name}
              </button>
            );
          // Right button
          if (index === cursorTypes.length - 1)
            return (
              <button
                type="button"
                onClick={() => setCursorType(c)}
                className={`-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border ${
                  activeType === c
                    ? "text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                    : "text-gray-700 bg-white hover:bg-gray-50"
                } border-gray-300 text-sm font-medium focus:z-10 focus:outline-none`}
              >
                {name}
              </button>
            );
          // All others
          return (
            <button
              type="button"
              onClick={() => setCursorType(c)}
              className={`-ml-px relative inline-flex items-center px-4 py-2 border ${
                activeType === c
                  ? "text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  : "text-gray-700 bg-white hover:bg-gray-50"
              } border-gray-300 text-sm font-medium focus:z-10 focus:outline-none`}
            >
              {name}
            </button>
          );
        })}
      </span>
    </div>
  );
};

export default Select;
