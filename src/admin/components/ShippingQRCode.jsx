// components/ShippingQRCode.jsx
import React from "react";
import PropTypes from "prop-types";
import { QRCodeSVG } from "qrcode.react";

const ShippingQRCode = React.forwardRef(({ data }, ref) => {
  return (
    <div ref={ref} className="qr-print-only">
      <QRCodeSVG value={JSON.stringify(data)} size={150} style={{ margin: '0 auto' }} />
    </div>
  );
});
ShippingQRCode.displayName = "ShippingQRCode";

ShippingQRCode.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ShippingQRCode;
