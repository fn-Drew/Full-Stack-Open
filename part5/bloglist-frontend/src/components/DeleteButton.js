const DeleteButton = ({ blog, deleteBlog }) => (
    <button onClick={() => deleteBlog({ blog })}>
        delete
    </button >
)

export default DeleteButton
