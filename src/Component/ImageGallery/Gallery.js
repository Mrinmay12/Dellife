import Slider from "react-slick";

import React,{useState} from "react";
import "./ImageSlider.css"; // Import your CSS file here
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlurredUpImage from "../ImageLoad/BlurredUpImage";
//npm install slick-carousel and npm install react-slick --save
const Gallery = ({images}) => {
  const [currentSlide, setCurrentSlide] = useState(0); 
  const totalSlides =images && images.length ;
  const settings = {
    className: "slidergallery",
    dots: totalSlides>1?true:false,
    arrows: false,
    infinite: true,
    fade: true,
    autoplay: true,
    speed: 1000,
    adaptiveHeight: true,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    }
  };

  return (
    <div className="slidergallery"> {/* Add className here */}
      
      
      <Slider {...settings}>
      {Array.isArray(images)&& images.map((item)=>(
      <div className="slide-container">
   
        <BlurredUpImage image={`${process.env.REACT_APP_FIREBASE}${process.env.REACT_APP_BUCKET}/o/${item}?alt=media`} className="imageshow"/>

  
     
        <div className="slide-indicator">
            {currentSlide + 1} / {totalSlides}
          </div>
     
     </div>
     ))}
      </Slider>
  
    </div>
  );
};

export default Gallery;



