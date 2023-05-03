type Part = {
    name: string,
    exerciseCount: number,
}

function Total({ courseParts }: { courseParts: Part[] }): JSX.Element {
    const totalParts = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)
    return (
        <p>
            Number of exercises{" "}
            {totalParts}
        </p>
    )
}

export default Total;
