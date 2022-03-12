import { useState } from "react";
import { sampleSize } from "lodash";

export type SelectedT = {
  firstField: number[];
  secondField: number[];
};

const useTicketLogic = () => {
  // state to store all chosen numbers
  const [selected, setSelected] = useState<SelectedT>({
    firstField: [],
    secondField: [],
  });

  // generating arrays for each field
  const firstNumberField = [...Array(19).keys()].map((i: number) => i + 1);
  const secondNumberField = [1, 2];

  // check whether user is choose all nums in its field or not
  const isFirstFull = selected.firstField.length === 8;
  const isSecondFull = selected.secondField.length === 1;
  const isAllChosen = isFirstFull && isSecondFull;

  const handleSelect = (num: number, field: number) => {
    /*
      HANDLE SELECT OF NUMBERS
      - if user click on already chosen number from 1 field, this will remove it from there
      - didn't implemented prev point on second field because there is only two variants
      - unable to choose more than 8 nums in first field
    */
    if (field === 1) {
      if (selected.firstField.includes(num)) {
        setSelected({
          ...selected,
          firstField: selected.firstField.filter((e) => e !== num),
        });
      } else {
        if (!isFirstFull) {
          setSelected({
            ...selected,
            firstField: [...selected.firstField, num],
          });
        }
      }
    } else if (field === 2) {
      setSelected({ ...selected, secondField: [num] });
    }
  };

  const chooseRandom = () => {
    // generate random numbers
    const randomFirst = sampleSize(firstNumberField, 8);
    const randomSecond = sampleSize(secondNumberField, 1);
    setSelected({ firstField: randomFirst, secondField: randomSecond });
  };

  return {
    handleSelect,
    selected,
    firstNumberField,
    secondNumberField,
    isAllChosen,
    chooseRandom,
  };
};

export default useTicketLogic;
