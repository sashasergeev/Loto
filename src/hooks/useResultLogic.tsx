import { useEffect, useState } from "react";
import { sampleSize } from "lodash";
import { ResultsI } from "../components/Results";

export type NumIsSucc = {
  num: number;
  isSucceed: boolean;
};

interface ResOverlapI {
  firstField: NumIsSucc[];
  secondField: NumIsSucc | Record<string, never>;
}

const useResultLogic = ({
  selected,
  firstNumberField,
  secondNumberField,
}: ResultsI) => {
  const [res, setRes] = useState<(boolean | number)[]>([]);
  const [resOverlap, setResOverlap] = useState<ResOverlapI>({
    firstField: [],
    secondField: {},
  });
  const [win, setWin] = useState<boolean | string>("loading");

  useEffect(() => handleResults(), []);
  useEffect(() => {
    if (res[0] === 4) {
      setWin(true);
    } else if (res[0] >= 3 && res[1]) {
      setWin(true);
    } else if (res[0]) {
      setWin(false);
    }
  }, [res]);

  const handleResults = () => {
    /* GENERATING RESULTS */
    const { firstField, secondField } = selected;
    // generate win numbers
    const firstFRes = sampleSize(firstNumberField, 8);
    const secondFRes = sampleSize(secondNumberField, 1);
    // analyze - i will need this data for further visualization
    const firstOverlap = firstFRes.map((e) => ({
      num: e,
      isSucceed: firstField.includes(e),
    }));
    const secondOverlap = {
      num: secondFRes[0],
      isSucceed: secondField[0] === secondFRes[0],
    };
    // result
    const firstFieldResult = firstOverlap.reduce(
      (sum, e) => (e.isSucceed ? (sum += 1) : sum),
      0
    );
    setResOverlap({ firstField: firstOverlap, secondField: secondOverlap });
    setRes([firstFieldResult, secondOverlap.isSucceed ? 1 : 0]);
  };

  return { res, resOverlap, win };
};

export default useResultLogic;
