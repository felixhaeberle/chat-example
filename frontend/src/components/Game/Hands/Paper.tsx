import * as React from "react";

import { Cursor, Weapon } from "../../../types";

import HandWrapper from "./HandWrapper";
import { settings } from "./settings";

interface PaperProps {
  covered: boolean;
  weapon: Weapon;
  setWeapon?: (value: Weapon) => void;
  winner: string | undefined;
  c?: Cursor;
}

const Paper: React.FC<PaperProps> = ({
  covered,
  weapon,
  setWeapon,
  winner,
  c,
}) => {
  return (
    <HandWrapper {...{ covered, type: "paper", weapon, setWeapon, winner, c }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        fill="none"
        viewBox="0 0 80 80"
        style={{ height: settings.size, width: settings.size }}
      >
        <mask
          id="path-1-outside-1_609_58497"
          width="50"
          height="69"
          x="13"
          y="6"
          fill="#000"
          maskUnits="userSpaceOnUse"
        >
          <path fill="#fff" d="M13 6H63V75H13z"></path>
          <path
            fillRule="evenodd"
            d="M28.838 47.876l-2.736-4.182c-1.771-2.705-5.438-3.782-8.408-2.555-.6.449-.861 1.3-.582 2.02l3.787 9.801c.6 1.554 2.134 3.75 3.405 4.855 0 0 7.621 8.569 7.621 10.933v2.994h12.346l3.086-6.173 3.086 6.173h3.087v-2.994c0-2.365 4.656-12.074 4.656-12.074.857-1.448 1.44-4.131 1.44-5.825V22.867c0-1.735-1.568-3.09-3.272-3.09a3.078 3.078 0 00-3.087 3.086v15.779h-1.852V14.919c0-1.735-1.567-3.09-3.271-3.09a3.078 3.078 0 00-3.087 3.086v23.727h-1.856V12.09c0-1.735-1.573-3.09-3.278-3.09a3.079 3.079 0 00-3.086 3.086v26.556h-1.832v-20.85a3.309 3.309 0 00-3.278-3.09 3.079 3.079 0 00-3.086 3.085l.197 30.089z"
            clipRule="evenodd"
          ></path>
        </mask>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M28.838 47.876l-2.736-4.182c-1.771-2.705-5.438-3.782-8.408-2.555-.6.449-.861 1.3-.582 2.02l3.787 9.801c.6 1.554 2.134 3.75 3.405 4.855 0 0 7.621 8.569 7.621 10.933v2.994h12.346l3.086-6.173 3.086 6.173h3.087v-2.994c0-2.365 4.656-12.074 4.656-12.074.857-1.448 1.44-4.131 1.44-5.825V22.867c0-1.735-1.568-3.09-3.272-3.09a3.078 3.078 0 00-3.087 3.086v15.779h-1.852V14.919c0-1.735-1.567-3.09-3.271-3.09a3.078 3.078 0 00-3.087 3.086v23.727h-1.856V12.09c0-1.735-1.573-3.09-3.278-3.09a3.079 3.079 0 00-3.086 3.086v26.556h-1.832v-20.85a3.309 3.309 0 00-3.278-3.09 3.079 3.079 0 00-3.086 3.085l.197 30.089z"
          clipRule="evenodd"
        ></path>
        <path
          fillRule="evenodd"
          stroke="#000"
          strokeWidth="6"
          d="M28.838 47.876l-2.736-4.182c-1.771-2.705-5.438-3.782-8.408-2.555-.6.449-.861 1.3-.582 2.02l3.787 9.801c.6 1.554 2.134 3.75 3.405 4.855 0 0 7.621 8.569 7.621 10.933v2.994h12.346l3.086-6.173 3.086 6.173h3.087v-2.994c0-2.365 4.656-12.074 4.656-12.074.857-1.448 1.44-4.131 1.44-5.825V22.867c0-1.735-1.568-3.09-3.272-3.09a3.078 3.078 0 00-3.087 3.086v15.779h-1.852V14.919c0-1.735-1.567-3.09-3.271-3.09a3.078 3.078 0 00-3.087 3.086v23.727h-1.856V12.09c0-1.735-1.573-3.09-3.278-3.09a3.079 3.079 0 00-3.086 3.086v26.556h-1.832v-20.85a3.309 3.309 0 00-3.278-3.09 3.079 3.079 0 00-3.086 3.085l.197 30.089z"
          clipRule="evenodd"
          mask="url(#path-1-outside-1_609_58497)"
        ></path>
      </svg>
    </HandWrapper>
  );
};

export default Paper;
