import express from 'express';
import * as driverControlller from '../controller/driver.controller.js';

const router = express.Router();

// Create a new driver
router.post('/register', driverControlller.registerDriver);

// Get all drivers
// router.get('/drivers', getAllDrivers);

// // Get a driver by ID
// router.get('/drivers/:id', getDriverById);

// // Update a driver by ID
// router.put('/drivers/:id', updateDriverById);

// // Delete a driver by ID
// router.delete('/drivers/:id', deleteDriverById);

export default router;