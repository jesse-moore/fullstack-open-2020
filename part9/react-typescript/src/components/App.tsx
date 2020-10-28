import React from 'react'
import { Content, Header, Total } from './'

const App: React.FC = () => {
	const courseName = "Half Stack application development";
	const courseParts = [
		{
			name: "Fundamentals",
			exerciseCount: 10
		},
		{
			name: "Using props to pass data",
			exerciseCount: 7
		},
		{
			name: "Deeper type usage",
			exerciseCount: 14
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