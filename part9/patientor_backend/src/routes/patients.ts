import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
    const newEntry = patientService.addEntry(req.body);
    res.json(newEntry);
});

export default router;
