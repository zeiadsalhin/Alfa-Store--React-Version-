import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#001529] text-white py-5 px-10">
      <div className="flex flex-wrap justify-between items-center gap-5">
        {/* Copyright Section */}
        <div className="w-full text-center">
          &copy; 2025 Alfa Store. All Rights Reserved.
        </div>

        {/* Navigation Links Section */}
        <div className="w-full text-center">
          <NavLink to="/terms" className="text-white mx-2">
            Terms of Service
          </NavLink>
          <NavLink to="/privacy" className="text-white mx-2">
            Privacy Policy
          </NavLink>
          <NavLink to="/contact" className="text-white mx-2">
            Contact Us
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
