import { CoursePart } from '../types';

function Total({ courseParts }: { courseParts: CoursePart[] }): JSX.Element {
    const totalParts = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)
    return (
        <p>
            Number of exercises{" "}
            {totalParts}
        </p>
    )
}

export default Total;
