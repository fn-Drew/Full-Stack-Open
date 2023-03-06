import React from 'react'

function ConfirmNotification({ message }) {
    if (message === null) {
        return null
    }

    return (
        <div className="confirm">
            {message}
        </div>
    )
}

export default ConfirmNotification
