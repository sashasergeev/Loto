import React, { useState } from "react";
import FieldContainer from "./FieldContainer";
import useTicketLogic from "../hooks/useTicketLogic";
import Results from "./Results";

const Ticket = ({ ticketID }: { ticketID: number }) => {
  const {
    selected,
    handleSelect,
    firstNumberField,
    secondNumberField,
    isAllChosen,
    chooseRandom,
  } = useTicketLogic();

  const [showResult, setShowResult] = useState<boolean>(false);

  return (
    <div className="Ticket">
      <div className="TicketHeader">
        <h3>Билет {ticketID}</h3>
        {!showResult && (
          <img
            onClick={() => chooseRandom()}
            src="magic-stick.png"
            alt="magic stick"
          />
        )}
      </div>
      {!showResult ? (
        <>
          <FieldContainer
            field={1}
            limit={8}
            handleSelect={handleSelect}
            selected={selected.firstField}
            arrayOfFieldNums={firstNumberField}
          />
          <FieldContainer
            field={2}
            limit={1}
            handleSelect={handleSelect}
            selected={selected.secondField}
            arrayOfFieldNums={secondNumberField}
          />
          <div className="ResultButtonBox">
            <button
              className={isAllChosen ? "Ready" : ""}
              onClick={() => (isAllChosen ? setShowResult(true) : undefined)}
            >
              Показать результаты
            </button>
          </div>
        </>
      ) : (
        <Results
          selected={selected}
          firstNumberField={firstNumberField}
          secondNumberField={secondNumberField}
        />
      )}
    </div>
  );
};

export default Ticket;
