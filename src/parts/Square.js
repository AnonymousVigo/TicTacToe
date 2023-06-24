
function Square({onClick, index, symbol, isBool}) {
  
    return <button className={`column ${isBool && 'bands'}`} onClick={() => onClick(index)}>{symbol}</button>
 
}

export default Square

