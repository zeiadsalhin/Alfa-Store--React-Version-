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
    <div style={styles.container}>
      <Helmet>
        <title>404 - Page Not Found | Alfa Store</title>
        <meta name="description" content="Oops! The page you are looking for does not exist." />
      </Helmet>

      <div style={styles.content}>
        <h1 style={styles.title}>404 Page Not Found</h1>
        <p style={styles.message}>The page you are looking for doesn&apos;t exist.</p>
        <Button type="primary" size="large" onClick={goHome} style={styles.button}>Go Back to Home</Button>
      </div>
    </div>
  );
};

// Inline styles for better control over design
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    flexDirection: 'column',
    padding: '20px',
    marginTop: '2rem',
  },
  content: {
    textAlign: 'center',
    maxWidth: '600px',
    padding: '30px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
  },
  message: {
    fontSize: '20px',
    color: '#595959',
    margin: '20px 0',
  },
  button: {
    marginTop: '20px',
  }
};

export default PageNotFound;
