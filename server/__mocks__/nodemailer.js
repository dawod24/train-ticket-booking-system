// server/__mocks__/nodemailer.js
const nodemailer = jest.createMockFromModule('nodemailer');

nodemailer.createTransport = jest.fn(() => ({
    sendMail: jest.fn(() => Promise.resolve({ messageId: 'mock-message-id' }))
}));

module.exports = nodemailer;