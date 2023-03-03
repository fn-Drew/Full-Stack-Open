import React from 'react';
import PropTypes from 'prop-types';

function Button({ mutableItem, mutatingFunction, text }) {
    if (!mutableItem) {
        return (
            <button type="button" onClick={mutatingFunction}>
                {text}
            </button>
        );
    }

    return (
        <button type="button" onClick={() => mutatingFunction({ mutableItem })}>
            {text}
        </button>
    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Button;
