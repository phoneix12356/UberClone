import mongoose from "mongoose";

// Define the driver schema
const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vehicleColor: { type: String, required: true }, // corrected 'string' to 'String'
  vehiclePlate: { type: String, required: true, unique: true },
  vehicleCapacity: { type: Number, required: true },
  vehicleType: { type: String, enum: ["Auto", "Car", "Moto"], required: true },
});

// Create the Driver model
const Driver = mongoose.model("Driver", driverSchema);

// Export the Driver model
export default Driver;