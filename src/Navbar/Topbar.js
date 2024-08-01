import React, { useState, useEffect } from "react";
import "./Topbar.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
// import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSignOutAlt,
  faArrowLeft,
  faHome,
  faUserFriends,
  faUser,
  faLocation,
  faUpload,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import Search from "../Component/SearchInput/Search";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../redux/action/RefreshAction";
import uploadblack from "./uploadblack.png";
import uploadred from "./uploadred.png";
import Searchbar from "../Component/SearchInput/Searchbar";
import ShareDetailsmodel from "../Component/DetailsShareModel/ShareDetailsmodel";
import PostPopUp from "../Component/Postpopup/PostPopUp";
import { userfriend } from "../AllApi/Integrateapi";
export default function Topbar() {
  const dispatch = useDispatch();
  const [borderPosition, setBorderPosition] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  // Destructuring pathname from location
  const { pathname } = location;
  const splitLocation = pathname.split("/");

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
  const getInitialPosition = (path, width) => {
    switch (path) {
      case "":
        return width * 3.6;
      case "post":
        return width * 4.3;
      case "profile":
        return width * 5.0;
      case "message":
        return width * 5.7;
      // Add more cases for other routes if needed
      default:
        return 0;
    }
  };

  const getInitialPosition2 = (path, width) => {
    switch (path) {
      case "":
        return 0;
      case "location":
        return width;
      case "post":
        return width * 2;
      case "profile":
        return width * 3;
      case "message":
        return width * 4;
      // Add more cases for other routes if needed
      default:
        return 0;
    }
  };
  useEffect(() => {
    // Set initial borderPosition based on the current route
    const lisLength = document.querySelectorAll("nav ul li").length;
    const lisWidth = 100 / lisLength;
    const position = !isMobile
      ? getInitialPosition(splitLocation[1], lisWidth)
      : getInitialPosition2(splitLocation[1], lisWidth);
    setBorderPosition(position);
    // console.log(lisWidth,"lisWidthlisWidth",position);
  }, [splitLocation[1], isMobile]);

  //  console.log(borderPosition,"my borderposiyion");

  const handleLinkClick = (e, i, attr) => {
    e.preventDefault();
    if (attr === "#one") {
      dispatch(setRefresh(new Date().getMilliseconds()));
      navigate("/");
    } else if (attr === "#two") {
      navigate("/location");
    } else if (attr === "#three") {
      navigate("/post");
    } else if (attr === "#four") {
      navigate("/message");
    } else if (attr === "#five") {
      navigate("/profile");
    } else {
      navigate(attr);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  //User message connect
  const userId = useSelector((state) => state.myReducer.data.message_id);
  const [memberslist, setMemberlist] = useState([]);
  useEffect(() => {
    // setBorderPosition(51.42857142857143);
    const data = async () => {
      try {
        const response = await userfriend(userId);
        if (response) {
          let dataarray = Array.isArray(response.data.data);
          if (dataarray) {
            let data = response.data.data;
            
            setMemberlist(data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (userId !== null && userId !== undefined && userId !== "undefined") {
      data();
    }
  }, [userId]);

  console.log(borderPosition,"pathnamepathname");
  return (
    <main>
      <header
        className={pathname.search("/chats") === 0 ? "clearfix2" : "clearfix"}
      >
        {(isMobile && pathname === "/location") ||
        pathname.search("/chats") === 0 ? null : (
          <div className="home">
            <a onClick={() => navigate("/")} className="logo">
              DelLife
            </a>
            {isMobile && (
              <div className="nearshare">
                <a href="#five">
                  <FontAwesomeIcon
                    icon={faMessage}
                    onClick={() => setIsModalOpen(true)}
                    className="iconstyle"
                  />
                </a>
              </div>
            )}
          </div>
        )}

        {!isMobile ? (
          <>
            {/* Destop view */}
            <nav className="container-fluid">
              <ul className="clearfix">
                <li>
                  <a>
                    {" "}
                    <Searchbar />
                  </a>
                </li>
                <li className="numicon">
                  <li>
                    <a
                      href="#one"
                      className={pathname === "/" ? "activ" : ""}
                      style={{ color: pathname === "/" ? "red" : "black" }}
                      onClick={(e) => handleLinkClick(e, 0, "#one")}
                    >
                      <FontAwesomeIcon
                        icon={faHome}
                        style={{ color: pathname === "/" ? "red" : "black" }}
                        className="iconstyle"
                      />
                    </a>
                  </li>

                  <li>
                    <div onClick={() => setIsModalOpen2(true)}>
                      <a href="#three">
                        <img
                          src={uploadblack}
                          style={{ width: "54px", height: "48px" }}
                          alt=""
                        />
                      </a>
                    </div>
                  </li>

                  <li>
                    <a
                      href="#five"
                      className={pathname === "/profile" ? "activ" : ""}
                      onClick={(e) => handleLinkClick(e, 4, "#five")}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{
                          color: pathname === "/profile" ? "red" : "black",
                        }}
                        className="iconstyle"
                      />
                    </a>
                  </li>
                  {Array.isArray(memberslist) && memberslist.length !== 0 && (
                    <li>
                      <a
                        href="#four"
                        className={
                          splitLocation[1] === "message" ? "activ" : ""
                        }
                        onClick={(e) => handleLinkClick(e, 3, "#four")}
                      >
                        <FontAwesomeIcon
                          icon={faMessage}
                          style={{
                            color:
                              splitLocation[1] === "message" ? "red" : "black",
                          }}
                          className="iconstyle"
                        />
                      </a>
                    </li>
                  )}

                  <li>
                    <a href="#five">
                      <FontAwesomeIcon
                        icon={faMessage}
                        onClick={() => setIsModalOpen(true)}
                        className="iconstyle"
                      />
                    </a>
                  </li>
                </li>
              </ul>
              {pathname !== "/location" &&
              splitLocation[1] !== "otherprofile" &&
              splitLocation[1] !== "sharepost" &&
              splitLocation[1] !== "searchuser" ? (
                <span
                  className="linebar2"
                  style={{ left: `${borderPosition}%` }}
                ></span>
              ) : (
                ""
              )}
            </nav>
          </>
        ) : (
          <>
            {/* Mobile view */}

            {pathname === "/location" || pathname.search("/chats") === 0 ? (
              <>
                <nav className="container-fluid">
                  <ul
                    className={
                      pathname.search("/chats") === 0 ? "clearfix2" : "clearfix"
                    }
                  >
                    <li>
                      <a
                        href="#one"
                        className={pathname === "/" ? "activ" : ""}
                        style={{ color: pathname === "/" ? "red" : "black" }}
                        onClick={(e) =>
                          pathname === "/location"
                            ? handleLinkClick(e, 0, "#one")
                            : navigate("/message")
                        }
                      >
                        <FontAwesomeIcon
                          icon={faArrowLeft}
                          style={{ color: pathname === "/" ? "red" : "black" }}
                          className="iconstyle"
                        />
                      </a>
                    </li>

                    <li>
                      <a>
                        {pathname.search("/chats") === 0 ? <></> : <Search />}
                      </a>
                    </li>
                  </ul>
                </nav>
              </>
            ) : (
              <>
                <nav className="container-fluid">
                  <ul className="clearfix">
                    <li>
                      <a
                        href="#one"
                        className={pathname === "/" ? "activ" : ""}
                        style={{ color: pathname === "/" ? "red" : "black" }}
                        onClick={(e) => handleLinkClick(e, 0, "#one")}
                      >
                        <FontAwesomeIcon
                          icon={faHome}
                          style={{ color: pathname === "/" ? "red" : "black" }}
                          className="iconstyle"
                        />
                      </a>
                    </li>

                    <li>
                      <a
                        href="#two"
                        className={pathname === "/location" ? "activ" : ""}
                        onClick={(e) => handleLinkClick(e, 1, "#two")}
                      >
                        <FontAwesomeIcon
                          icon={faSearch}
                          style={{
                            color: pathname === "/location" ? "red" : "black",
                          }}
                          className="iconstyle"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#three"
                        className={pathname === "/post" ? "activ" : ""}
                        onClick={(e) => handleLinkClick(e, 2, "#three")}
                      >
                        {/* <FontAwesomeIcon icon={faUpload} style={{ color: pathname === '/post' ? "red" : "black" }} className="iconstyle" /> */}
                        {pathname === "/post" ? (
                          <img
                            src={uploadred}
                            style={{ width: "54px", height: "48px" }}
                          />
                        ) : (
                          <img
                            src={uploadblack}
                            style={{ width: "54px", height: "48px" }}
                          />
                        )}
                      </a>
                    </li>

                    <li>
                      <a
                        href="#five"
                        className={pathname === "/profile" ? "activ" : ""}
                        onClick={(e) => handleLinkClick(e, 4, "#five")}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{
                            color: pathname === "/profile" ? "red" : "black",
                          }}
                          className="iconstyle"
                        />
                      </a>
                    </li>

                    <li>
                      <a
                        href="#four"
                        className={
                          splitLocation[1] === "message" ? "activ" : ""
                        }
                        onClick={(e) => handleLinkClick(e, 3, "#four")}
                      >
                        <FontAwesomeIcon
                          icon={faMessage}
                          style={{
                            color:
                              splitLocation[1] === "message" ? "red" : "black",
                          }}
                          className="iconstyle"
                        />
                      </a>
                    </li>
                  </ul>
                  <span
                    className="linebar"
                    style={{ left: `${borderPosition}%` }}
                  ></span>
                </nav>
              </>
            )}
          </>
        )}
      </header>
      <section className="row">
        <div className=" content activ" id="one">
          {/* Content for One */}
        </div>
        <div className=" content" id="two">
          {/* Content for Two */}
        </div>
        <div className=" content" id="three">
          {/* Content for Three */}
        </div>
        <div className=" content" id="four">
          {/* Content for Four */}
        </div>
        <div className=" content" id="five">
          {/* Content for Five */}
        </div>
      </section>
      {isModalOpen && <ShareDetailsmodel onClose={closeModal} />}
      {isModalOpen2 && <PostPopUp onClose={closeModal2} />}
    </main>
  );
}
