interface inputValues {
    weight: number;
    height: number;
}

const validateInput = (args: Array<string>): inputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return { height: Number(args[2]), weight: Number(args[3]) };
    } else {
        throw new Error('malformatted parameters');
    }
};

const validateQuery = (height: number, weight: number): inputValues => {
    if (!isNaN(height) && !isNaN(weight)) {
        return { height, weight };
    }
    throw new Error('malformatted parameters');
};

const bmiCalculator = (height: number, weight: number): string => {
    if (height === 0) throw Error('Height must be greater than 0');
    const bmi = weight / (height / 100) ** 2;
    if (bmi < 15) return 'Very severely underweight';
    if (bmi < 16) return 'Severely underweight';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal (healthy weight)';
    if (bmi < 30) return 'Overweight';
    if (bmi < 35) return 'Obese Class I (Moderately obese)';
    if (bmi < 40) return 'Obese Class II (Severely obese)';
    return 'Obese Class III (Very severely obese)';
};

const calculateBmi = (height: number, weight: number): string => {
    const validatedInput = validateQuery(height, weight);
    return bmiCalculator(validatedInput.height, validatedInput.weight);
};

if (require.main === module) {
    try {
        const { height, weight } = validateInput(process.argv);
        const bmi = bmiCalculator(height, weight);
        console.log(bmi);
    } catch ({ message }) {
        console.log('Error, something bad happened, message: ', message);
    }
}

export default calculateBmi;
