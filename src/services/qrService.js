const QRCode = require('qrcode');

exports.generateQRCode = async (text) => {
  try {
    return await QRCode.toDataURL(text); // Returns base64 image
  } catch (err) {
    throw new Error('QR code generation failed');
  }
};
