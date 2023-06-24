import React, { Component } from 'react'
import Board from './Board'
import Button from './Button'


class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playTurns: true,
            square: Array(9).fill(null),
            history: [],
            moveLocation: [],
            togglers: Array(10).fill(false)
        };
        this.clicksHandlerBind = this.clicksHandler.bind(this);
        this.historyClickHandlerBind = this.historyClickHandler.bind(this);
    }

    clicksHandler(index) {
        // console.log("fired");

        const symbol = this.state.playTurns ? 'X' : 'O';
        const square = this.state.square.concat();
        const history = this.state.history.concat();
        const moveLocation = this.state.moveLocation.concat();

        //the conditional statement below checks if the button has been clicked
        if (square[index] || winnerDeterminer('symbol', square)) {
            return false;
        }

        if (history.length === 0) {
            history.push(Array(9).fill(null))
        }

        square[index] = symbol;
        history.push(square);
        moveLocation.push(movePosition(index))

        // handling the state Object
        this.setState({
            square: square,
            playTurns: !this.state.playTurns,
            history: history,
            moveLocation: moveLocation

        })


    }

    historyClickHandler(index) {
        let history = this.state.history.concat();
        let moveLocation = this.state.moveLocation.concat();
        let togglers = this.state.togglers.concat().fill(false);

        history = history.slice(0, index + 1);
        moveLocation = moveLocation.slice(0, index);
        const square = history[history.length - 1];
        togglers[index] = true;

        // Updating the State's
        this.setState({
            history: history,
            square: square,
            playTurns: index % 2 === 0 ? true : false,
            moveLocation: moveLocation,
            togglers: togglers
        })
    }



    render() {
        // comment section
        const status = this.state.playTurns ? "X's turn to play" : "O's turn to play";
        const square = this.state.square.concat();
        const history = this.state.history.concat();
        const winner = winnerDeterminer('symbol', square);
        let comment = winner ? `${winner} is the Winner !!!` : history.length === 10 ? 'IT IS A DRAW !!!' : status;

        // the  history section
        const historyButtons = this.state.history.map((item, index) => <Button key={index} index={index} onClick={this.historyClickHandlerBind} position={!index ? null : this.state.moveLocation[index - 1]} isBool={this.state.togglers} />)

        // console.log(winner)

        return (
            <>
                <div className="container">
                    <header><h1>TicTacToe</h1></header>
                    <div className="top-section">
                        <div className="moves-histories">
                            {historyButtons}
                        </div>
                        <div className="comment-section">
                            <h3 className="comment">{`=> ${comment}`}</h3>
                        </div>
                    </div>
                    <div className="game-section">
                        <Board onClick={this.clicksHandlerBind} square={this.state.square} winLine={winnerDeterminer('arrayPosition', square)} />
                    </div>
                </div>

            </>
        )
    }
}

export default Game


// this function returns the winner(X or O) or null
function winnerDeterminer(_name, square) {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    // loop
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (_name === 'symbol' && square[a] && square[a] === square[b] && square[a] === square[c]) return square[a];
        if (_name === 'arrayPosition' && square[a] && square[a] === square[b] && square[a] === square[c]) return lines[i];

    }

    return null;
}

// Helps target the line that caused the Win


// this function returns the position of the Moves
function movePosition(index) {
    const position = [
        "1x1", "2x1", "3x1",
        "1x2", "2x2", "3x2",
        "1x3", "2x3", "3x3"
    ];

    for (let i = 0; i < position.length; i++) {

        if (i === index) return position[i];
    }


}