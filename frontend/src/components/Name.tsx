import * as React from "react";

interface NameProps {
  name: string;
  setName: (value: string) => void;
}

const Name: React.FC<NameProps> = ({ name, setName }) => {
  return (
    <div>
      <label>Your name</label>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </div>
  );
};

export default Name;
