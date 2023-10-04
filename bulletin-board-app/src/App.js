import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './Header';
import { ThreadList } from './ThreadList';
import { NewThread } from './NewThread';

const App  = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={ <ThreadList /> } />
        <Route path="/thread/new" element={ <NewThread />} />
      </Routes>
    </div>
  );
}

export { App };
