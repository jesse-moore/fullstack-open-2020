import express from 'express';
import patientService from '../services/patientService';

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
    const newEntry = patientService.addEntry(req.body);
    res.json(newEntry);
});

export default router;
