const SortButton = ({ sortBlogs, sorted }) => (
    <button onClick={() => sortBlogs()}>
        {sorted ?
            'alphabetical'
            :
            'likes'
        }
    </button >
)

export default SortButton
