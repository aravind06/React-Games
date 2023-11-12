import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const jsonData = {
  "pay bill": [
    "Make a payment - 62.50%",
    "view bill - 5.00%",
    "bill history - 2.50%",
    "pay later - 30.00%",
  ],
  "view bill": [
    "Make a payment - 12.50%",
    "view bill - 62.50%",
    "bill history - 22.50%",
    "pay later - 2.50%",
  ],
};

const CarouselComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(jsonData)[0]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h1>JSON Data Carousel</h1>
      <div>
        <label>Select Category:</label>
        <select onChange={(e) => handleCategoryChange(e.target.value)}>
          {Object.keys(jsonData).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <Carousel>
        {Object.entries(jsonData).map(([category, elements]) => (
          <div key={category}>
            <h2>Human utterance: {category}</h2>
            <div>
            <h4>Matched intents</h4>
            <ul>
              {elements.map((element, index) => (
                <li key={index}>{element}</li>
              ))}
            </ul>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
