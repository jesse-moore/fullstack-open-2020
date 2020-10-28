import React from 'react'
import { ContentProps } from '../types'

const Content: React.FC<ContentProps> = ({ courseParts }) => {
	return (
		<>
			{courseParts.map(({ name, exerciseCount }) => {
				return (<p key={name}>
					{name} {exerciseCount}
				</p>)
			})}
		</>
	)
}

export default Content