const getDescription = (rating: number): string => {
    let ratingDescription = '';
    if (rating === 3) {
        ratingDescription = 'Very good!';
    }
    if (rating === 2) {
        ratingDescription = 'OK.';
    }
    if (rating === 1) {
        ratingDescription = 'Very bad!';
    }
    return ratingDescription;
};

interface Result {
    totalDays: number,
    daysTrained: number,
    target: number,
    averageHours: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
}

export const calculationExercises = (input: number[], target: number): Result => {
    if (isNaN(Number(target))) {
        throw new Error('Malformatted request in target');
    }
    target = Number(target);

    input.map((day, index) => {
        if (isNaN(Number(day))) {
            throw new Error(`Malformatted request in day ${index + 1}`);
        }
    });

    const totalDays = input.length;

    const totalHours = input.reduce(
        (totalHours, day) => totalHours + day
    );

    const averageHours = totalHours / totalDays;

    const success = (averageHours >= target) ? true : false;

    let daysTrained = 0;
    input.map((day) => {
        if (day > 0) {
            daysTrained++;
        }
    });

    let rating = Math.round(averageHours);

    if (rating > 3) {
        rating = 3;
    }

    if (rating < 0) {
        rating = 1;
    }

    const ratingDescription = getDescription(rating);

    return {
        totalDays,
        daysTrained,
        averageHours,
        target,
        success,
        rating,
        ratingDescription,
    };
};
