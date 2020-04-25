import * as React from "react";
import { useCountdown } from "./useCountdown";
import "./styles.css";

const SATOSHIS_BIRTHDAY = "08/23/2020";

export default function App() {
  const [date, setDate] = React.useState<string>(SATOSHIS_BIRTHDAY);
  const [DAYS, HOURS, MINUTES, SECONDS] = useCountdown({
    until: date
  });
  return (
    <div className="App">
      <h1>
        {DAYS} Days, {HOURS} Hours, {MINUTES} Minutes, {SECONDS} Seconds
      </h1>
      <label htmlFor="date-input">Date: </label>
      <input
        onChange={e => setDate(e.target.value)}
        type="datetime-local"
        id="date-input"
      />
    </div>
  );
}
