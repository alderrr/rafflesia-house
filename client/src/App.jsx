import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Homepage</h1>} />
      <Route path="/rooms" element={<h1>Room List</h1>} />
      <Route path="/location" element={<h1>Location</h1>} />
      <Route path="/contact" element={<h1>Contact</h1>} />
      <Route path="/login" element={<h1>Login</h1>} />
    </Routes>
  );
}

export default App;
