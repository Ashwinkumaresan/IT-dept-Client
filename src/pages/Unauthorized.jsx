// src/pages/Unauthorized.jsx
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>403 - Unauthorized</h1>
      <p style={styles.message}>You don’t have permission to view this page.</p>
      <Link to="/" style={styles.link}>← Go back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '5rem 2rem',
    minHeight: '100vh',
    backgroundColor: '#f8f8f8',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    fontSize: '3rem',
    color: '#e63946',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.25rem',
    color: '#333',
    marginBottom: '2rem',
  },
  link: {
    textDecoration: 'none',
    color: '#0077cc',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
};

export default Unauthorized;
