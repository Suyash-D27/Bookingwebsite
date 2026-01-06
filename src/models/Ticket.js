const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  ticketNumber: { type: String, unique: true },
  qrPayload: { type: Object }, // store QR data as JSON
  pdfUrl: { type: String }, // link to generated PDF
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
