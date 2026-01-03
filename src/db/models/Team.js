import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

teamSchema.index({ companyId: 1 });
teamSchema.index({ managerId: 1 });

export default mongoose.model('Team', teamSchema);