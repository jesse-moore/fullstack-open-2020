interface inputValues {
    target: number;
    daily_exercises: Array<number>;
}

const validateInput = (args: Array<string>): inputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const values = args.slice(2).map((v) => {
        const value = Number(v);
        if (isNaN(value)) throw new Error('Provided values were not numbers!');
        return value;
    });

    const [target, ...periods] = values;
    return { target, daily_exercises: periods };
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

const validateQuery = (data: inputValues): inputValues => {
    const { daily_exercises, target } = data;
    if (!daily_exercises || !target) {
        throw new Error('parameters missing');
    }
    if (!Array.isArray(daily_exercises) || isNaN(target)) {
        throw new Error('malformatted parameters');
    }
    const isArrayWithNumbers =
        daily_exercises.filter((value) => isNaN(value)).length === 0;
    if (!isArrayWithNumbers) {
        throw new Error('malformatted parameters');
    }
    return data;
};

const exerciseCalculator = (data: inputValues): result => {
    const { daily_exercises, target } = validateQuery(data);
    return calculateExercises(daily_exercises, target);
};

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
    const average =
        periodLength > 0
            ? hoursArray.reduce((a, b) => a + b, 0) / periodLength
            : 0;
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

if (require.main === module) {
    try {
        const { target, daily_exercises } = validateInput(process.argv);
        const result = calculateExercises(daily_exercises, target);
        console.log(result);
    } catch ({ message }) {
        console.log('Error, something bad happened, message: ', message);
    }
}

export { exerciseCalculator, inputValues };
