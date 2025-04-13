import { SignJWT, jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(import.meta.env.VITE_SECRET_JWT); // Convert to Uint8Array

// Function to generate JWT
export const generateJWT = async (payload) => {
    try {
        console.log(secretKey);

        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' }) // Set the JWT header
            .setExpirationTime('7d') // Set expiration time
            .sign(secretKey);

        return jwt;
    } catch (error) {
        console.error('Error generating JWT token:', error);
        return null;
    }
};
