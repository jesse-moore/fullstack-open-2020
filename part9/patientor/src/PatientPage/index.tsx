import React from 'react';
import { useParams } from "react-router-dom";
import { Icon, Header, List } from "semantic-ui-react";
import { useStateValue } from "../state";


const PatientPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [{ patients }] = useStateValue();

	const patient = patients[id];
	if (!patient) return null;
	return (
		<div>
			<Header>{patient.name}<Icon name='mars' /></Header>
			<List>
				<List.Item><strong>Date of Birth: </strong>{patient.dateOfBirth}</List.Item>
				<List.Item><strong>Gender: </strong>{patient.gender}</List.Item>
				<List.Item><strong>Occupation: </strong>{patient.occupation}</List.Item>
			</List>

		</div>
	);
};

export default PatientPage;
