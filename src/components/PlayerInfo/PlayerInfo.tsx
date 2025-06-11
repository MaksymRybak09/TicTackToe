import { useEffect, useState } from "react";
import { formatTime } from "../../lib/helpers/formatTime";
import type { Player } from "../../types/player";
import type { Time } from "../../types/time";
import type { Wins } from "../../types/wins";

type PlayerInfoProps = {
  wins: Wins;
  gameCount: number;
  currentPlayer: Player;
  winner: Player | "draw" | null;
  time: Time;
};

function PlayerInfo(props: PlayerInfoProps) {
  const [displayedTime, setDisplayedTime] = useState(props.time);

  useEffect(() => {
    if (props.winner) {
      setDisplayedTime(props.time);
      return;
    }

    setDisplayedTime(props.time);

    const lastStartTime = Date.now();

    const interval = setInterval(() => {
      setDisplayedTime((prev) => ({
        ...prev,
        [props.currentPlayer]:
          props.time[props.currentPlayer] + (Date.now() - lastStartTime),
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [props.currentPlayer, props.time, props.winner]);

  return (
    <div>
      <h1>Wins</h1>
      <p>Player X: {props.wins.X}</p>
      <p>Player O: {props.wins.O}</p>
      <h1>Time</h1>
      <p>Player X: {formatTime(displayedTime.X)}</p>
      <p>Player O: {formatTime(displayedTime.O)}</p>
      <h1>Total games</h1>
      <p>You have played {props.gameCount} games</p>
      <h1>Current player</h1>
      <p>Player {props.currentPlayer} makes his move</p>
    </div>
  );
}

export default PlayerInfo;
