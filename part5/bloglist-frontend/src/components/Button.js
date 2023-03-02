import PropTypes from 'prop-types'


const Button = ({ mutableItem, mutatingFunction, text }) => {
    if (!mutableItem) {
        return (
            <button onClick={mutatingFunction}>
                {text}
            </button >
        )
    }

    return (
        <button onClick={() => mutatingFunction({ mutableItem })}>
            {text}
        </button >
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired
}


export default Button
