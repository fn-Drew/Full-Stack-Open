interface HeightAndWeight {
    height: number;
    weight: number;
}

const parseArguments = (args: string[]): HeightAndWeight => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const calculateBmi = (height: number, weight: number): string => {
    const bmi = (weight / height ** 2) * 10000;

    if (bmi < 18.5) {
        return "Underweight: " + bmi;
    }

    if (bmi < 24.9) {
        return "Normal: " + bmi;
    }

    if (bmi < 29.9) {
        return "Overweight: " + bmi;
    }

    return "Obese: " + bmi;
};

try {
    const { height, weight } = parseArguments(process.argv);
    const bmi = calculateBmi(height, weight);
    console.log(bmi);
} catch (error: unknown) {
    let errorMessage = 'There was an error!';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
