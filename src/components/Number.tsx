import React from "react";

interface NumberI {
  num: number;
  field: number;
  handleSelect: (num: number, field: number) => void;
  isSelected: boolean;
}

const Number = ({ num, field, handleSelect, isSelected }: NumberI) => {
  const select = () => handleSelect(num, field);
  return (
    <div
      onClick={select}
      className="NumberBox"
      style={isSelected ? { outline: "1px solid white" } : {}}
    >
      <div className={isSelected ? "Selected" : ""}>{num}</div>
    </div>
  );
};

export default Number;
