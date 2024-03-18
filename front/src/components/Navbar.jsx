import { Link } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav>
        <ul>
          <li className={styles.title}><Link to="/">SuiteStore</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/history">History</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar