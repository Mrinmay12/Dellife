import React from "react";
import useProgressiveImg from "./useProgressiveImg";
const BlurredUpImage = ({image,className}) => {
  const [src, { blur }] = useProgressiveImg("https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",image);
  return (
    <>
    <img
      src={src}
      style={{
        // width: 200,
        filter: blur ? "blur(20px)" : "none",
        transition: blur ? "none" : "filter 0.3s ease-out"
      }}
      alt=""
      className={className?className:""}
    />
    </>
  );
};

export default BlurredUpImage