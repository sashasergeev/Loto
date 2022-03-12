import React, { useEffect } from "react";

import useResultLogic, { NumIsSucc } from "../hooks/useResultLogic";
import useApiCall from "../hooks/useApiCall";
import { SelectedT } from "../hooks/useTicketLogic";

export interface ResultsI {
  selected: SelectedT;
  firstNumberField: number[];
  secondNumberField: number[];
}

export type LotoDataResutsT = {
  selectedNumber: { firstField: number[]; secondField: number[] };
  isTicketWon: boolean | string;
};

const Results = (props: ResultsI) => {
  const { res, resOverlap, win } = useResultLogic({ ...props });
  const { sendResultToServer, reqStatus } = useApiCall();

  useEffect(() => {
    if (win !== "loading") {
      // request options
      const url = "https://blocknroll.com/rock-block";
      const { firstField, secondField } = props.selected;
      const data: LotoDataResutsT = {
        selectedNumber: {
          firstField,
          secondField,
        },
        isTicketWon: win,
      };
      // make request
      (async function () {
        await sendResultToServer(url, data);
      })();
    }
  }, [win]);

  return (
    <div className="ResultBox">
      <div className="ResultTitle">Результаты</div>
      <div className="Overlap First">
        {resOverlap.firstField.map(({ num, isSucceed }: NumIsSucc, inx) => (
          <div
            key={`res-${inx}`}
            style={{ color: isSucceed ? "limegreen" : "red" }}
          >
            {num}
          </div>
        ))}
      </div>
      <div className="Overlap Second">
        <div style={{ color: !res[1] ? "red" : "limegreen" }}>
          {resOverlap.secondField?.num && resOverlap.secondField?.num}
        </div>
      </div>
      <div>Совпадений в первом поле: {res[0]}</div>
      <div>Совпадений во втором поле: {res[1]}</div>

      {/* RESULT */}
      <div className="Result">
        {win === "loading"
          ? "Идёт вычисление результатов..."
          : win
          ? "Вы выиграли!"
          : "Вы проиграли!"}
      </div>

      {/* SENDING RESULT */}
      <div className="RequestStatus">{reqStatus}</div>
    </div>
  );
};

export default Results;
