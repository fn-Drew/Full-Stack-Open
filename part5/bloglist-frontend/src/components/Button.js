// const Button = ({ itemToMutate, howToMutate, text }) => (
//     <button onClick={() => howToMutate({ itemToMutate })}>
//         {text}
//     </button >
// )
//
// export default Button

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


export default Button
