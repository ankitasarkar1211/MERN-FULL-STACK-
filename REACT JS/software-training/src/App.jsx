import React, { useState, useEffect } from "react"
import './App.css'

function App() {
  const knowMoreBtn= () => {
    alert("Welcome! Explore our courses to boost your career.");
  }
  const slides = [
    "https://images.unsplash.com/photo-1527689368864-3a821dbccc34",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  ];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  },[slides.length]);


  return (
    <div className="App-body">
      <header>
        <h2>Software Training Centre</h2>
        <nav>
          <ul>
            <li>
              Courses
              <ul>
                <li>Java</li>
                <li>Python</li>
                <li>Web Development</li>
                <li>Data Science</li>
              </ul>
            </li>
            <li>About</li>
            <li>
              Contact
              <ul>
                <li>Email</li>
                <li>Phone</li>
              </ul>
            </li> 
          </ul>
        </nav>
      </header>
      <div class="slideshow">
        {slides.map((img, index) => (
          <img
            key={index}
            src={img}
            className="slide"
            alt="slide"
            style={{ display: index === slideIndex ? "block" : "none" }}
          />
        ))}
      </div>
      <section class="center-content">
        <h1>Welcome to Our Training Centre</h1>
        <p>Learn industry-demand technologies with real-time projects.</p>
        <button className="knowMoreBtn" onClick={knowMoreBtn}>
          Know More
        </button>
      </section>
      <footer>© 2025 Software Training Centre | All Rights Reserved</footer>
    </div>
  )
}

export default App
