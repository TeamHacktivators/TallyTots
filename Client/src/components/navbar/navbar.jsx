import styles from './navbar.module.css';
import { useNavigate } from 'react-router';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        TALLY TOTS
      </div>
      <ul className={styles.navLinks}>
        <li onClick={() => navigate('/')}>Home</li>
        <li><a href="#demo">Demo</a></li>
        <li onClick={() => navigate('/test')}>Test</li>
        <li onClick={() => navigate('/team')}>Team</li>
      </ul>
    </nav>
  );
}
