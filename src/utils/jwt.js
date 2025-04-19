import { SignJWT, jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(import.meta.env.VITE_SECRET_JWT); // Convert to Uint8Array

// Function to generate JWT
export const generateJWT = async (payload) => {
    if (!window.crypto || !window.crypto.subtle) {
        console.error('❌ Web Crypto not supported in this environment');
        return null;
    }

    try {
        const key = secretKey;
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setExpirationTime('7d')
            .sign(key);

        return jwt;
    } catch (error) {
        console.error('❌ Error generating JWT token:', error);
        return null;
    }
};

// Function to verify JWT
export const verifyJWT = async (token) => {
    try {
        const { payload } = await jwtVerify(token, secretKey);
        // console.log('Verified Payload:', payload);
        return payload; // Return decoded payload after verification
    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
};
