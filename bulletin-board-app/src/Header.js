import './App.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__title">掲示板</Link>
      <Link to="/thread/new" className="header__thread">スレッドをたてる</Link>
    </header>
  );
}

export { Header };
