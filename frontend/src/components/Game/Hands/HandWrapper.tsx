import * as React from "react";

import { Cursor, Weapon } from "../../../types";

interface HandWrapperProps {
  children: React.ReactNode;
  covered: boolean;
  type: Weapon;
  weapon: Weapon;
  setWeapon?: (value: Weapon) => void;
  winner: string | undefined;
  c?: Cursor;
}

const HandWrapper: React.FC<HandWrapperProps> = ({
  children,
  covered,
  type,
  weapon,
  setWeapon,
  winner,
  c,
}) => {
  // Check if active selection
  const isActive = type === weapon && !covered;
  return (
    <>
      <div
        onClick={
          setWeapon
            ? () => {
                setWeapon(type);
              }
            : undefined
        }
        className={`flex items-center justify-center border-2 ${
          isActive ? "border-lime-500" : ""
        } rounded-full p-4 overflow-hidden relative`}
      >
        {covered && (
          <div className="absolute h-28 w-28 bg-indigo-100 top-0 left-0"></div>
        )}
        {children}
      </div>
    </>
  );
};

export default HandWrapper;
