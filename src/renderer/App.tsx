import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ImageTool from './ImageTool';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ImageTool />} />
      </Routes>
    </Router>
  );
}
