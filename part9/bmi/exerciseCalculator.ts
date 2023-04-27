// calculates average time of daily exercise hours and compares it to the
// target amount of daily hours and return an object

const parseUserInput = (args: string[]): number[] => {
    if (args.length < 4) throw new Error('Not enough arguments');

    // check if all args are numbers
    const parsedArgs = args.slice(2).map((arg) => {
        if (isNaN(Number(arg))) {
            throw new Error('Provided values were not numbers!');
        } else {
            return Number(arg)
        }
    })

    return parsedArgs
}

const getDescription = (rating: number): string => {
    let ratingDescription = ''
    if (rating === 3) {
        ratingDescription = 'Very good!'
    }
    if (rating === 2) {
        ratingDescription = 'OK.'
    }
    if (rating === 1) {
        ratingDescription = 'Very bad!'
    }
    return ratingDescription;
}

interface Result {
    totalDays: number,
    daysTrained: number,
    target: number,
    averageHours: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
}

const calculationExercises = (input: number[]): Result => {
    const target = input.shift()
    const totalDays = input.length

    const totalHours = input.reduce(
        (totalHours, day) => totalHours + day
    )

    const averageHours = totalHours / totalDays

    const success = (averageHours >= target) ? true : false

    let daysTrained = 0;
    input.map((day) => {
        if (day > 0) {
            daysTrained++
        }
    })

    let rating = Math.round(averageHours)

    if (rating > 3) {
        rating = 3
    }

    if (rating < 0) {
        rating = 1
    }

    const ratingDescription = getDescription(rating)

    return {
        totalDays,
        daysTrained,
        averageHours,
        target,
        success,
        rating,
        ratingDescription,
    }
}

try {
    const args = parseUserInput(process.argv);
    console.log(calculationExercises(args))
} catch (error: unknown) {
    let errorMessage = 'There was an error!'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage)
}
