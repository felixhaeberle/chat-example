import * as React from "react";

interface NameProps {
  name: string;
  setName: (value: string) => void;
}

const Name: React.FC<NameProps> = ({ name, setName }) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Your name
      </label>
      <div className="mt-1">
        <input
          type="email"
          name="email"
          id="email"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Name;
