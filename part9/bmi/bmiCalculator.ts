const calculateBmi = (height: number, weight: number): string => {
    const bmi = (weight / height ** 2) * 10000;

    if (bmi < 18.5) {
        return "Underweight: " + bmi;
    };

    if (bmi < 24.9) {
        return "Normal: " + bmi;
    };

    if (bmi < 29.9) {
        return "Overweight: " + bmi;
    };

    return "Obese: " + bmi;
}

console.log(calculateBmi(180, 47));
console.log(calculateBmi(180, 74));
console.log(calculateBmi(180, 90));
console.log(calculateBmi(180, 100));
