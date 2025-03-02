import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StreamList } from "./components/Navigation/StreamList/StreamList";
import { Movies } from "./components/Pages/Movies/Movies";
import { Cart } from "./components/Pages/Cart/Cart";
import { About } from "./components/Pages/About/About";
import Navigation from "./components/Navigation/Navigation";

import "./styles.css";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [streams, setStreams] = useState<{
    id: number;
    text: string;
    completed: boolean;
  }[]>([]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addStream = (text: string) => {
    const newStream = { id: Date.now(), text, completed: false };
    setStreams((prevStreams) => [...prevStreams, newStream]);
  };

  const deleteStream = (id: number) => {
    setStreams((prevStreams) => prevStreams.filter((stream) => stream.id !== id));
  };

  const toggleStreamCompletion = (id: number) => {
    setStreams((prevStreams) =>
      prevStreams.map((stream) =>
        stream.id === id ? { ...stream, completed: !stream.completed } : stream
      )
    );
  };

  const editStream = (id: number, newText: string) => {
    setStreams((prevStreams) =>
      prevStreams.map((stream) =>
        stream.id === id ? { ...stream, text: newText } : stream
      )
    );
  };

  return (
    <Router>
      <div className={`App ${darkMode ? "dark-mode" : ""}`}>
        <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                <StreamList
                  streams={streams}
                  addStream={addStream}
                  deleteStream={deleteStream}
                  toggleStreamCompletion={toggleStreamCompletion}
                  editStream={editStream}
                />
              }
            />
            <Route path="/movies" element={<Movies />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

