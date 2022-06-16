import * as React from "react";

import HandWrapper from "./HandWrapper";
import { Weapon } from "../../../types";
import { settings } from "./settings";

interface PaperProps {
  covered: boolean;
  setWeapon?: (value: Weapon) => void;
}

const Paper: React.FC<PaperProps> = ({ covered, setWeapon }) => {
  return (
    <HandWrapper {...{ covered, type: "paper", setWeapon }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="42"
        fill="none"
        viewBox="0 0 15 21"
        stroke={settings.stroke}
        strokeWidth={settings.strokeWidth}
        style={{ height: settings.size, width: settings.size }}
      >
        <path
          fill={settings.color}
          fillRule="evenodd"
          d="M4.445 12.995l-.886-1.354c-.574-.877-1.762-1.226-2.724-.828a.576.576 0 00-.19.655l1.228 3.175c.195.503.691 1.215 1.103 1.573 0 0 2.47 2.776 2.47 3.542v.97h4l1-2 1 2h1v-.97c0-.766 1.508-3.912 1.508-3.912.278-.469.466-1.338.466-1.887V4.893c0-.562-.507-1.001-1.06-1.001-.556 0-1 .447-1 1v5.112h-.6V2.318c0-.563-.507-1.002-1.06-1.002-.556 0-1 .448-1 1v7.688H9.1V1.4C9.099.839 8.589.4 8.037.4c-.556 0-1 .447-1 1v8.604h-.594V3.248a1.072 1.072 0 00-1.062-1.001c-.556 0-1 .448-1 1l.064 9.748z"
          clipRule="evenodd"
        ></path>
      </svg>
    </HandWrapper>
  );
};

export default Paper;
