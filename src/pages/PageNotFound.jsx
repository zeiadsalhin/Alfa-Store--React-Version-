// src/Pages/PageNotFound.jsx
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const PageNotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 flex-col p-5 mt-8">
      <Helmet>
        <title className='text-xl'>404 - Page Not Found | Alfa Store</title>
        <meta name="description" content="Oops! The page you are looking for does not exist." />
      </Helmet>

      <div className="text-center max-w-2xl p-8">
        <h1 className="text-4xl font-bold">404 Page Not Found</h1>
        <p className="text-lg text-gray-600 my-5">The page you are looking for doesn&apos;t exist.</p>
        <Button
          type="primary"
          size="large"
          onClick={goHome}
          className="mt-5"
        >
          Go Back to Home
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
