import { CoursePart } from '../types';
import Part from './Part';

function Content({ courseParts }: { courseParts: CoursePart[] }): JSX.Element {
    return (
        <>
            {
                courseParts.map((part, index) => (
                    <Part key={index} part={part} />
                ))
            }
        </>
    );
}

export default Content;
