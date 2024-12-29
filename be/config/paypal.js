import paypal from '@paypal/checkout-server-sdk';
import dotenv from 'dotenv';
dotenv.config();

// Cấu hình môi trường PayPal
const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
);

// Sử dụng PayPal Client
const client = new paypal.core.PayPalHttpClient(environment);

export default client;
