import { Helmet } from 'react-helmet';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Alfa Store</title>
        <meta name="description" content="Welcome to Alfa Store, your one-stop-shop for all things amazing!" />
      </Helmet>
    <div style={{ padding: '20px' }}>
      <h1 className='text-xl font-semibold py-1'>Terms of Service</h1>
      <p>
        Welcome to Alfa Store. By accessing or using our website, you agree to be bound by the following terms and conditions:
      </p>
      <h2>1. Introduction</h2>
      <p>
        These Terms of Service govern your use of our website. If you do not agree to these terms, please do not use our site.
      </p>
      <h2>2. Use of the Website</h2>
      <p>
        You may use this website for lawful purposes and in accordance with these terms. You must not use the website in a way that disrupts or interferes with its operation.
      </p>
      <h2>3. Limitation of Liability</h2>
      <p>
        Alfa Store is not responsible for any damages arising from the use or inability to use our services. We provide the website &quot;as is&quot; without any warranties.
      </p>
      <h2>4. Changes to Terms</h2>
      <p>
        We reserve the right to modify these Terms of Service at any time. Any changes will be posted on this page.
      </p>
    </div>
    </>
  );
};

export default TermsOfService;
