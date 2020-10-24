interface inputValues {
    target: number;
    periods: Array<number>;
}

const validateInput = (args: Array<string>): inputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const values = args.slice(2).map((v) => {
        const value = Number(v);
        if (isNaN(value)) throw new Error('Provided values were not numbers!');
        return value;
    });

    const [target, ...periods] = values;
    return { target, periods };
};

interface result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (
    hoursArray: Array<number>,
    targetHours: number
): result => {
    const ratings = {
        1: { rating: 1, description: 'Below target hours' },
        2: { rating: 2, description: 'Met target hours' },
        3: { rating: 3, description: 'Above target hours' },
    };
    const periodLength = hoursArray.length;
    const trainingDays = hoursArray.filter((hours) => hours > 0).length;
    const average = hoursArray.reduce((a, b) => a + b) / periodLength;
    const success = average >= targetHours;
    const rating = average < targetHours ? 1 : average > targetHours ? 3 : 2;
    const ratingDescription = ratings[rating].description;

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        average,
        target: targetHours,
    };
};

try {
    const { target, periods } = validateInput(process.argv);
    const result = calculateExercises(periods, target);
    console.log(result);
} catch ({ message }) {
    console.log('Error, something bad happened, message: ', message);
}

export {};
