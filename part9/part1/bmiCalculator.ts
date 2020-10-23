interface inputValues {
    weight: number
    height: number
}

const validateInput = (args: Array<string>): inputValues => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return { weight: Number(args[2]), height: Number(args[3]) }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

const bmiCalculator = (height: number, weight: number): string => {
    const bmi = weight / (height / 100) ** 2
    if (bmi < 15) return 'Very severely underweight'
    if (bmi < 16) return 'Severely underweight'
    if (bmi < 18.5) return 'Underweight'
    if (bmi < 25) return 'Normal (healthy weight)'
    if (bmi < 30) return 'Overweight'
    if (bmi < 35) return 'Obese Class I (Moderately obese)'
    if (bmi < 40) return 'Obese Class II (Severely obese)'
    if (bmi >= 40) return 'Obese Class III (Very severely obese)'
}

try {
    const { height, weight } = validateInput(process.argv)
    const bmi = bmiCalculator(height, weight)
    console.log(bmi)
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message)
}

export {};
