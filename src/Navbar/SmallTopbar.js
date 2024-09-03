import React, { useState, useEffect } from "react";
import "./Topbar.css";
import { useSelector } from "react-redux";
export default function SmallTopbar({ setColor, data }) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const userlocation = useSelector((state) => state.UserLocation.data);
  const userlogin = useSelector((state) => state.myReducer.data);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const [show, setShow] = useState("near");
  const handleShow = (e) => {
    setShow(e);
    if (e === "near") {
      setColor("black");
    } else if (e === "argent") {
      setColor("red");
    } else {
      setColor("green");
    }
  };


  useEffect(() => {
    if (userlogin.location_post) {
      setShow("near");
      setColor("black");
    } else {
      setShow("argent");
      setColor("red");
    }
  }, [
    userlogin.location_post
  ]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
let following=userlogin.total_following > 0?true:false
  return (
    <>
    {[following,userlogin.location_post].every((ele)=>ele==false)?(
      ""
    ):(
      
    <div
      className={isMobile ? "smallnavbarmobile" : "smallnavbar"}
      style={{
        top: visible ? (isMobile ? "97px" : "57px") : "-50px",
        zIndex: 1,
      }}
    >
     
        <div className="profilediv">
        <div
          className="profilebottom"
          style={{ width: "30%", backgroundColor: "#d4e2d25c" }}
        >
          {userlogin.location_post ? (
            <p
              className={
                show === "near" ? "profilebottomtext" : "profilebottomtext2"
              }
              onClick={() => handleShow("near")}
              style={{ color: show === "near" ? "red" : "black" }}
            >
              <img
                style={{ height: "18px", marginRight: "4px" }}
                src={""}
                alt=""
              />
              Near
            </p>
          ) : null}

          <p
            className={
              show === "argent" ? "profilebottomtext" : "profilebottomtext2"
            }
            style={{ color: show === "argent" ? "red" : "black" }}
            onClick={() => handleShow("argent")}
          >
            <img style={{ height: "18px" }} src={""} alt="" /> Tags
          </p>
          {userlogin.total_following > 0 && (
            <p
              className={
                show === "post" ? "profilebottomtext" : "profilebottomtext2"
              }
              style={{ color: show === "post" ? "red" : "black" }}
              onClick={() => handleShow("post")}
            >
              <img style={{ height: "18px" }} src={""} alt="" /> Follow
            </p>
          )}
        </div>
      </div>
    
     
    </div>
  
  )}
    </>
  );
}
