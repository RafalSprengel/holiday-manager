import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  registrationNumber: {
    type: String,
    trim: true,
  },
  settings: {
    fiscalYearStart: {
      month: { type: Number, default: 4 },
      day: { type: Number, default: 6 }
    },
    defaultAllowance: {
      type: Number,
      default: 28
    },
    includeBankHolidaysInAllowance: {
      type: Boolean,
      default: true
    }
  },
  address: {
    line1: String,
    line2: String,
    city: String,
    postcode: String,
    country: { type: String, default: 'United Kingdom' }
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Company', companySchema);