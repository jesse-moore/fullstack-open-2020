interface CoursePartBase {
    name: string
    exerciseCount: number
}

interface CoursePartDescription extends CoursePartBase {
    description: string
}

interface CoursePartOne extends CoursePartDescription {
    name: 'Fundamentals'
}

interface CoursePartTwo extends CoursePartBase {
    name: 'Using props to pass data'
    groupProjectCount: number
}

interface CoursePartThree extends CoursePartDescription {
    name: 'Deeper type usage'
    exerciseSubmissionLink: string
}

interface CoursePartFour extends CoursePartDescription {
    name: 'Fourth Part'
    submissions: number
}

export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
}

export type CoursePart =
    | CoursePartOne
    | CoursePartTwo
    | CoursePartThree
    | CoursePartFour
