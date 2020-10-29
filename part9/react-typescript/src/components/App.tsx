import React from 'react'
import { Content, Header, Total } from './'
import { CoursePart } from '../types'

const App: React.FC = () => {
	const courseName = "Half Stack application development";
	const courseParts: CoursePart[] = [
		{
			name: "Fundamentals",
			exerciseCount: 10,
			description: "This is an awesome course part"
		},
		{
			name: "Using props to pass data",
			exerciseCount: 7,
			groupProjectCount: 3
		},
		{
			name: "Deeper type usage",
			exerciseCount: 14,
			description: "Confusing description",
			exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
		},
		{
			name: "Fourth Part",
			exerciseCount: 5,
			description: "This is another awesome course part",
			submissions: 8
		}
	];
	return (
		<div>
			<Header name={courseName} />
			<Content courseParts={courseParts} />
			<Total courseParts={courseParts} />
		</div>
	)
}

export default App