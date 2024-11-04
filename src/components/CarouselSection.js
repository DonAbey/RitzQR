import React from "react";
import { useState } from "react";
import banner1 from "../assets/aem1.png";
import Carousel from "react-bootstrap/Carousel";
import banner2 from "../assets/aem2.png";
import banner3 from "../assets/aem3.png";

//Carousel slider component
const CarouselSection = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="pd-50">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item interval={3000}>
          <img
            src={banner3}
            alt=""
            style={{ width: "100%", height: "800px" }}
          />
          <Carousel.Caption className="carousel-caption d-flex flex-column justify-content-center h-100">
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            src={banner1}
            alt=""
            style={{ width: "100%", height: "800px" }}
          />
          <Carousel.Caption className="carousel-caption d-flex flex-column justify-content-center h-100">
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            src={banner2}
            alt=""
            style={{ width: "100%", height: "800px" }}
          />
          <Carousel.Caption className="carousel-caption d-flex flex-column justify-content-center h-100">
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselSection;
