// calculates average time of daily exercise hours and compares it to the
// target amount of daily hours and return an object
//
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
    const target = 2
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

console.log(calculationExercises([3, 0, 2, 4.5, 0, 3, 1]))
