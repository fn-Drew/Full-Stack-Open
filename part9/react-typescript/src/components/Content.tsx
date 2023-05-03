type Part = {
    name: string,
    exerciseCount: number,
}

function Content({ courseParts }: { courseParts: Part[] }): JSX.Element {
    return (
        <>
            {
                courseParts.map((part, index) => (
                    <p key={index}>
                        {part.name} {part.exerciseCount}
                    </p>
                ))
            }
        </>
    );
}

export default Content;
