import express from 'express';
import patientService from '../services/patientService';
import { Entry } from '../types/types';

const router = express.Router();

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const patient = patientService.getPatientByID(id);
    res.json(patient);
});

router.get('/', (_req, res) => {
    res.json(patientService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
    try {
        const newEntry = patientService.addPatient(req.body);
        res.json(newEntry);
    } catch ({ message }) {
        const error = message ? String(message) : 'malformatted parameters';
        res.status(400).json({ error });
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const { id } = req.params;
        const newEntry: Entry = patientService.addEntry({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            entry: req.body,
            patientID: id,
        });
        res.json(newEntry);
    } catch ({ message }) {
        const error = message ? String(message) : 'malformatted parameters';
        res.status(400).json({ error });
    }
});

export default router;
