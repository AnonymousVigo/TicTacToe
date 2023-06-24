import React from 'react'
import Square from './Square'

function Board({square, onClick, winLine}){

        const squareRender = (index) => {
            // console.log(winLine)
            if(winLine){
                for (let i = 0; i < 3; i++) {
                    if (index === winLine[i]) {
        
                        return (<Square index={index} symbol={square[index]} onClick={onClick} isBool={true} />)
                    }
                }

            }


        return <Square index={index} symbol={square[index]} onClick={onClick} isBool={false} />
    }

   
        return (
            <div className="board">
                <div className="row">
                    {squareRender(0)}
                    {squareRender(1)}
                    {squareRender(2)}
                </div>
                <div className="row">
                    {squareRender(3)}
                    {squareRender(4)}
                    {squareRender(5)}
                </div>
                <div className="row">
                    {squareRender(6)}
                    {squareRender(7)}
                    {squareRender(8)}

                </div>
            </div>
        )

}

export default Board
