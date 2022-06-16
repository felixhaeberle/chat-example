import * as React from "react";

import HandWrapper from "./HandWrapper";
import { Weapon } from "../../../types";
import { settings } from "./settings";

interface RockProps {
  covered: boolean;
  setWeapon?: (value: Weapon) => void;
}

const Rock: React.FC<RockProps> = ({ covered, setWeapon }) => {
  return (
    <HandWrapper {...{ covered, type: "rock", setWeapon }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="13"
        fill="none"
        viewBox="0 0 14 13"
        stroke={settings.stroke}
        strokeWidth={settings.strokeWidth}
        style={{ height: settings.size, width: settings.size }}
      >
        <path
          fill={settings.color}
          fillRule="evenodd"
          d="M10.497 12.433l-1-2-1 2h-4v-1.037c0-.818-2.801-3.1-2.801-3.1-.442-.328-.8-1.035-.8-1.593V4.908c0-1.146.894-2.075 1.999-2.075v2.658h.602V1.105c0-.477.373-.864.834-.864.92 0 1.666.774 1.666 1.728v-.345c0-.478.373-.865.834-.865.92 0 1.666.774 1.666 1.729v-.346c0-.477.373-.864.834-.901.92.037 1.666.81 1.666 1.765v-.345c0-.478.373-.865.834-.865.92 0 1.666.774 1.666 1.729v2.912c0 .55-.237 1.377-.525 1.853 0 0-1.475 2.288-1.475 3.106v1.037h-1z"
          clipRule="evenodd"
        ></path>
      </svg>
    </HandWrapper>
  );
};

export default Rock;
