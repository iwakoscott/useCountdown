import { useReducer, useCallback, useRef, useEffect } from "react";
import { Actions, initialState, reducer } from "./reducer";

export const ONE_SECOND = 1000;
export const ONE_MINUTE = ONE_SECOND * 60;
export const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;

function calculateOffset(until?: string) {
  const now = new Date();
  const endTime = new Date(until as string);
  let diff = 0;
  if (/invalid date/i.test(String(endTime.toTimeString()))) {
    diff = -1;
  } else {
    diff = endTime.getTime() - now.getTime();
  }
  return diff <= ONE_SECOND ? 0 : diff;
}

interface CountdownConfig {
  until?: string;
}

export const useCountdown = ({ until }: CountdownConfig = {}) => {
  const [{ offset }, dispatch] = useReducer(reducer, initialState, () => {
    return {
      ...initialState,
      offset: calculateOffset(until)
    };
  });

  const intervalRef = useRef<number>();
  const handleClearCountdown = useCallback(() => {
    window.clearInterval(intervalRef.current);
  }, []);

  const handleTick = useCallback(() => {
    if (offset < ONE_SECOND) {
      handleClearCountdown();
    } else dispatch({ type: Actions.TICK });
  }, [offset, handleClearCountdown]);

  useEffect(() => {
    dispatch({
      type: Actions.SET_OFFSET,
      offset: calculateOffset(until)
    });
  }, [until]);

  useEffect(() => {
    intervalRef.current = window.setInterval(handleTick, ONE_SECOND);
    return () => {
      handleClearCountdown();
    };
  }, [handleTick, handleClearCountdown]);

  if (until) {
    const DAYS_REMAINDER = offset % ONE_DAY;
    const HOURS_REMAINDER = DAYS_REMAINDER % ONE_HOUR;
    const MINUTES_REMAINDER = HOURS_REMAINDER % ONE_MINUTE;

    const DAYS = Math.floor((offset - DAYS_REMAINDER) / ONE_DAY);
    const HOURS = Math.floor(DAYS_REMAINDER / ONE_HOUR);
    const MINUTES = Math.floor(HOURS_REMAINDER / ONE_MINUTE);
    const SECONDS = Math.floor(MINUTES_REMAINDER / ONE_SECOND);

    return [DAYS, HOURS, MINUTES, SECONDS];
  } else {
    return ["<%DAYS%>", "<%HOURS%>", "<%MINUTES%>", "<%SECONDS%>"];
  }
};
