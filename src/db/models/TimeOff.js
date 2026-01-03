import mongoose from "mongoose";

const absenceDaySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['full', 'morning', 'afternoon'],
    default: 'full',
  },
  status: {
    type: String,
    enum: ['active', 'cancelled'],
    default: 'active',
  },
}, { _id: false });

const absenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  absenceType: {
    type: String,
    enum: [
      'annual-leave',
      'sick-leave',
      'unpaid-leave',
      'maternity-paternity',
      'compassionate-leave',
      'bank-holiday',
      'other'
    ],
    required: true,
  },
  days: {
    type: [absenceDaySchema],
    validate: [v => Array.isArray(v) && v.length > 0, 'At least one day is required']
  },
  status: {
    type: String,
    enum: ['pending', 'auto-approved', 'approved', 'declined', 'cancelled', 'partially-cancelled'],
    default: 'pending',
  },
  isSelfCertified: {
    type: Boolean,
    default: false
  },
  fitNoteProvided: {
    type: Boolean,
    default: false
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reviewedAt: Date,
  notes: String,
  declinedReason: String, 
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

absenceSchema.virtual('totalDays').get(function() {
  if (!this.days) return 0;
  
  return this.days
    .filter(day => day.status === 'active')
    .reduce((acc, day) => {
      return acc + (day.type === 'full' ? 1 : 0.5);
    }, 0);
});

absenceSchema.index({ userId: 1, 'days.date': 1, status: 1 });
absenceSchema.index({ companyId: 1, 'days.date': 1, status: 1 });
absenceSchema.index({ teamId: 1, 'days.date': 1, status: 1 });

export default mongoose.model('Absence', absenceSchema);