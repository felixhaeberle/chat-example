import * as React from "react";

import { Weapon } from "../../../types";

interface HandWrapperProps {
  children: React.ReactNode;
  covered: boolean;
  type: Weapon;
  setWeapon?: (value: Weapon) => void;
}

const HandWrapper: React.FC<HandWrapperProps> = ({
  children,
  covered,
  type,
  setWeapon,
}) => {
  return (
    <div
      onClick={
        setWeapon
          ? () => {
              setWeapon(type);
            }
          : undefined
      }
      className="flex items-center justify-center border-2 rounded-full p-4 overflow-hidden relative"
    >
      {covered && (
        <div className="absolute h-28 w-28 bg-indigo-100 top-0 left-0"></div>
      )}
      {children}
    </div>
  );
};

export default HandWrapper;
