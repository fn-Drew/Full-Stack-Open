import { CoursePart } from "../types";

function Part({ part }: { part: CoursePart }): JSX.Element {
    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount} </h3>
                    <p> {part.description} </p>
                </div>
            );
        case "group":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount} </h3>
                    <p> project exercises {part.groupProjectCount} </p>
                </div>
            );
        case "background":
            return (
                <div>
                    <h3> {part.name} {part.exerciseCount} </h3>
                    <p> {part.description} </p>
                    <p> {part.backgroundMaterial} </p>
                </div>
            )
        case "require":
            return (
                <div>
                    <h3> {part.name} {part.exerciseCount} </h3>
                    <p> {part.description} </p>
                    <p> requirements: <ul>{part.requirements.map((req, index) => <li key={index}> {req} </li>)}</ul> </p>
                </div>
            )
        default:
            return (
                <div> nothing </div>
            )
    }
}

export default Part;
