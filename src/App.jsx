import { HashRouter, Routes, Route } from 'react-router-dom'
import MapleList from './pages/MapleList'
import './App.css'
import backgroundImage from './image/background.jpg'

function App() {
  return (
    <HashRouter>
      <div className="fixed inset-0 -z-10 bg-white">
        <img
          src={backgroundImage}
          alt="background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <Routes>
        <Route path="/" element={<MapleList />} />
      </Routes>
    </HashRouter>
  )
}

export default App
