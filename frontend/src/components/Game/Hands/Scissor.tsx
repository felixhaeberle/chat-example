import * as React from "react";

import HandWrapper from "./HandWrapper";
import { Weapon } from "../../../types";
import { settings } from "./settings";

interface ScissorProps {
  covered: boolean;
  setWeapon?: (value: Weapon) => void;
}

const Scissor: React.FC<ScissorProps> = ({ covered, setWeapon }) => {
  return (
    <HandWrapper {...{ covered, type: "scissor", setWeapon }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="20"
        fill="none"
        viewBox="0 0 14 20"
        stroke={settings.stroke}
        strokeWidth={settings.strokeWidth}
        style={{ height: settings.size, width: settings.size }}
      >
        <path
          fill={settings.color}
          d="M2.84 3.598A1.07 1.07 0 001.5 3.02a1 1 0 00-.6 1.282l2.906 7.975-.57.207-.85-2.336h-.25c-1.104 0-1.604.909-1.604 2.054v1.796c0 .557.359 1.265.8 1.593 0 0 2.802 2.281 2.802 3.1v1.036h4l1-2 1 2h1v-1.036c0-.819 1.474-3.106 1.474-3.106.288-.476.526-1.303.526-1.853V10.82c0-.954-.746-1.728-1.667-1.728-.46 0-.833.387-.833.864v.346c0-.955-.746-1.729-1.667-1.766a.908.908 0 00-.833.902h-.602V1.402c0-.562-.51-1-1.062-1-.556 0-1 .448-1 1v8.036h-.504L2.84 3.598z"
        ></path>
      </svg>
    </HandWrapper>
  );
};

export default Scissor;
