import { useEffect, useState } from "react";
import { sleep } from "../utils/utils";

interface useTimerType {
  interval: number;
}

/**
 * counts up timer
 *
 * @param interval number (Seconds)
 */
const useTimer = ({ interval }: useTimerType) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const tick = async () => {
      await sleep(interval * 1000);
      setSeconds((seconds) => seconds + interval);
    };
    tick()
  }, [seconds]);

  return [seconds];
};

export default useTimer;
