import type { Player } from "../../types/player";
import type { Wins } from "../../types/wins";

type PlayerInfoProps = {
  wins: Wins;
  gameCount: number;
  currentPlayer: Player;
};

function PlayerInfo(props: PlayerInfoProps) {
  return (
    <div>
      <h1>Wins</h1>
      <p>Player X: {props.wins.X}</p>
      <p>Player O: {props.wins.O}</p>
      <h1>Total games</h1>
      <p>You have played {props.gameCount} games</p>
      <h1>Current player</h1>
      <p>Player {props.currentPlayer} makes his move</p>
    </div>
  );
}

export default PlayerInfo;
