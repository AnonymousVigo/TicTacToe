import PropTypes from 'prop-types'


const Button = ({color, text, onClick, showAdd}) => {

    return<button onClick={onClick} className='btn' style={{backgroundColor: color}}> {text} </button>
  
}

export default Button

Button.defaultProps = {
    text: 'xxx',
    color: 'steelblue'
}
Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired
}
