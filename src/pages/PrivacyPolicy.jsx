import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Alfa Store</title>
        <meta name="description" content="Welcome to Alfa Store, your one-stop-shop for all things amazing!" />
      </Helmet>
    <div style={{ padding: '20px' }}>
      <h1 className='text-xl font-semibold py-1'>Privacy Policy</h1>
      <p>
        At Alfa Store, we take your privacy seriously. This privacy policy outlines how we collect, use, and protect your personal information.
      </p>
      <h2>1. Information We Collect</h2>
      <p>
        We may collect personal information, such as your name, email address, phone number, and payment details when you register or make a purchase.
      </p>
      <h2>2. How We Use Your Information</h2>
      <p>
        We use the information we collect to process orders, improve our services, and send you updates regarding your account or promotions.
      </p>
      <h2>3. Data Protection</h2>
      <p>
        We take the security of your personal information seriously and implement appropriate security measures to protect it.
      </p>
      <h2>4. Your Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal information. If you wish to exercise any of these rights, please contact us.
      </p>
    </div>
    </>
  );
};

export default PrivacyPolicy;
