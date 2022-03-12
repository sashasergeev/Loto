import React from "react";
import Number from "./Number";

interface FieldContainerI {
  arrayOfFieldNums: number[];
  handleSelect: (num: number, field: number) => void;
  limit: number;
  field: number;
  selected: number[];
}

const FieldContainer = ({
  arrayOfFieldNums,
  handleSelect,
  limit,
  field,
  selected,
}: FieldContainerI) => {
  return (
    <>
      <div className="FieldDetails">
        <span className="FieldTitle">Поле 1</span>
        <span>Отметьте {limit - selected.length} чисел.</span>
      </div>
      <div className="NumberList">
        {arrayOfFieldNums.map((e: number, inx) => (
          <Number
            key={`${field}-${inx}`}
            handleSelect={handleSelect}
            isSelected={selected.includes(e)}
            field={field}
            num={e}
          />
        ))}
      </div>
    </>
  );
};

export default FieldContainer;
