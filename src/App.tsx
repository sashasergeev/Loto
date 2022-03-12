import React, { useState } from "react";
import "./App.css";
import Ticket from "./components/Ticket";

const App = (): JSX.Element => {
  const [tickets, setTickets] = useState([1]);
  const addTicket = () => {
    setTickets([...tickets, tickets.length + 1]);
  };

  return (
    <div className="App">
      {/* LIST OF TICKETS */}
      {tickets.map((e) => (
        <Ticket key={`ticket-${e}`} ticketID={e} />
      ))}
      {/* ADD TICKET BUTTON */}
      <button onClick={addTicket} className="AddButton">
        Добавить билет
      </button>
    </div>
  );
};

export default App;
