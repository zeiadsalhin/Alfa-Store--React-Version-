import { generateJWT } from './jwt'; // Import your JWT utility

export const generateOrderQRCodeData = async (order) => {
    const orderData = {
        id: order.orderId,
        customer: order.customer,
        date: order.date,
        total: order.total,
        status: order.status || "N/A",
        items: order.items,
    };

    // Generate JWT with order data
    const token = await generateJWT(orderData);

    if (token) {
        const orderLink = `${window.location.origin}/order-details/${token}`;  // URL containing the JWT
        // console.log(`Order Link: ${orderLink}`);  // Log the order link for debugging

        return JSON.stringify({
            url: orderLink,  // Link that includes the JWT token
        });
    } else {
        console.error('Failed to generate JWT');
        return null;
    }
};
