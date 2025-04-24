// utils/generateShippingLabelWithQRCode.js
import jsPDF from "jspdf";
import * as htmlToImage from 'html-to-image';

export const generateShippingLabelWithQRCode = async (order, qrRef) => {
    try {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(16);
        doc.text("Alfa Store - Shipping Label", 10, 20);

        // Order Info
        doc.setFontSize(12);
        doc.text(`Order ID: ${order.orderId}`, 10, 35);
        doc.text(`Customer: ${order.customer}`, 10, 45);
        doc.text(`Date: ${order.date}`, 10, 55);
        doc.text(`Status: ${order.status}`, 10, 65);

        // Items
        doc.text("Items:", 10, 80);
        let y = 90;
        order.items.forEach((item) => {
            doc.text(`- ${item.name} x${item.quantity} (${item.price})`, 15, y);
            y += 10;
        });

        // Convert the hidden QR SVG to PNG
        const dataUrl = await htmlToImage.toPng(qrRef.current);

        // Add QR code image
        doc.addImage(dataUrl, "PNG", 120, 20, 50, 50);

        doc.save(`shipping_label_${order.orderId}.pdf`);
    } catch (err) {
        console.error("Failed to generate PDF:", err);
    }
};
