const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.generateTicketPDF = (ticket, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(25).text('Sikkim Tourism Ticket', { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(`Name: ${ticket.userName}`);
    doc.text(`Booking ID: ${ticket.bookingId}`);
    doc.text(`Place: ${ticket.placeName}`);
    doc.text(`Date: ${ticket.date}`);
    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};
