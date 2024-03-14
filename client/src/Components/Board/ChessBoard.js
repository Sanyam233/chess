import Position from '../../Helpers/Position';

import Square from './Square/Square';

const isEven = (num) => {
  return num % 2 === 0;
};

const ChessBoard = (props) => {
  const Board = [];

  for (let i = 7; i >= 0; i--) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      const isPotential = props.isPotentialMove(i, j);
      row.push(
        <Square
          getMoves={props.getMoves}
          color={(isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))}
          piece={props.board[i][j]}
          pos={new Position(i, j)}
          updateGame={props.updateGame}
          board={props.board}
          number={j === 0 ? i + 1 : null}
          alpha={i === 0 ? String.fromCharCode(97 + j) : null}
          isPotential={isPotential}
        />
      );
    }

    Board.push(row);
  }

  return <div className="board">{Board}</div>;
};

export default ChessBoard;
