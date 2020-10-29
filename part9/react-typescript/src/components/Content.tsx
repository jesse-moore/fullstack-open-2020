import React from 'react'
import { Part } from './'
import { CoursePart } from '../types'

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
	return (
		<>
			{courseParts.map(part => {
				return <Part key={part.name} part={part} />
			})}
		</>
	)
}

export default Content