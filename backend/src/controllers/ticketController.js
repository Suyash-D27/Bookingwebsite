const { Ticket, Booking } = require('../models');
const path = require('path');
const fs = require('fs');

const { generateTicketPDF } = require('../services/pdfService');
const { generateQRCode } = require('../services/qrService');
const { sendMail } = require('../services/mailService');

const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');

exports.generateTicket = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;

  // 1️⃣ Fetch booking
  const booking = await Booking.findById(bookingId).populate('userId');
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  // 2️⃣ Create ticket in DB
  const ticketNumber = `TKT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const ticket = await Ticket.create({
    bookingId: booking._id,
    userId: req.user.id,
    ticketNumber: ticketNumber,
    status: 'active'
  });

  // 3️⃣ Generate QR Code
  const qrCodeBase64 = await generateQRCode(`BookingID:${booking._id}`);

  // 4️⃣ Generate PDF ticket
  const pdfDir = path.join(__dirname, '../tickets');
  if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);

  const pdfPath = path.join(pdfDir, `ticket_${ticket._id}.pdf`);
  await generateTicketPDF({
    userName: req.user.name,
    bookingId: booking._id,
    placeName: booking.targetName,
    date: booking.date,
    qrCodeBase64
  }, pdfPath);

  // 5️⃣ Send ticket via email
  try {
    await sendMail({
      to: req.user.email,
      subject: 'Your Sikkim Tourism Ticket',
      html: `<p>Hello ${req.user.name},</p>
                 <p>Your ticket is attached. Please present it at the venue.</p>`,
      attachments: [{ path: pdfPath }]
    });
  } catch (emailErr) {
    console.error("Failed to send email:", emailErr.message);
    // Suppress error so ticket generation succeeds
  }

  // 6️⃣ Return response
  res.status(201).json(
    new ApiResponse(201, {
      ticketId: ticket._id,
      pdfDownload: `/tickets/${ticket._id}/download`
    }, 'Ticket generated successfully and sent to your email')
  );
});

// Get ticket info
exports.getTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate('bookingId');
  if (!ticket) {
    throw new ApiError(404, 'Ticket not found');
  }
  res.status(200).json(
    new ApiResponse(200, ticket, "Ticket details fetched")
  );
});

// Download PDF ticket
exports.downloadTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new ApiError(404, 'Ticket not found');
  }

  const pdfPath = path.join(__dirname, '../tickets', `ticket_${ticket._id}.pdf`);
  if (!fs.existsSync(pdfPath)) {
    throw new ApiError(404, 'PDF not found');
  }

  res.download(pdfPath);
});

