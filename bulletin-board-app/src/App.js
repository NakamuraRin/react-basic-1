import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import ThreadList from './ThreadList';
import NewThread from './NewThread';
import ThreadPostList from './ThreadPostList';

const App  = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={ <ThreadList /> } />
        <Route path="/thread/new" element={ <NewThread />} />
        <Route path="/thread/:thread_id" element={ <ThreadPostList /> } />
      </Routes>
    </div>
  );
}

export default App;
