import React from 'react'
import "./TextShow.css"
import message from "./Images/message.png"
import greenTick from "./Images/green_tick.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import platform from 'platform';
// import Checkbox from './Checkbox'
export default function TextShow() {
  const handleShareImage = () => {
    // Check if the Web Share API is supported in the browser.
    if (navigator.share) {
      // Use the share() method to share the image.
      navigator.share({
        title: 'Image Sharing',
        text: 'Check out this image!',
        url: "/postid",
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in this browser.');
    }
  };
  return (
    <div>
      <div class="containertext">
        <div className='topstyle'>
          <div className='profiletag'>
            <div class="user-info">
              <img src="https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=800" alt="User Image" />
              <span class="user-name">Mrinmay Manna</span>
            </div>
          </div>
          <div className='shairicone' onClick={handleShareImage}>
            <img width="20" height="20" src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/external-share-interface-kiranshastry-solid-kiranshastry-1.png" alt="external-share-interface-kiranshastry-solid-kiranshastry-1" />
          </div>
        </div>

        <h3>Responsive Area Test</h3>
        <div class="mainimage-cards-container">
          <div class="">
            <img src="https://cdn.lifehacker.ru/wp-content/uploads/2019/05/Valley-of-Geysers_Olikbas-Shutterstock_1599819392.jpg" alt='headerimage' className='imageshow' />

          </div>
        </div>
        <div class="user-info2">
          <img className='user-info2_img' src="https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=800" alt="User Image" />
          <span class="user-name2">Shay sg(another user)</span>

          <img width="20" height="20" style={{ paddingLeft: "7px" }} src={greenTick} alt="approval--v1" />
        </div>
        <div class="slovetext">
          <p>This is a responsive area for testing purposes.hfghdfghgfhWhat is Lorem Ipsum?
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          </p>
        </div>
        <div className='topstyle'>
          <div className='profiletag'>
            <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} className="iconstyle" />
          </div>
          <div className='shairicone'>
            <img width="25" height="25" src={message} alt="chat-message--v1" />
            {/* <img width="20" height="20" src={greenTick} alt="approval--v1"/> */}
          </div>
        </div>
      </div>

      {/* only text */}
      <div class="containertext">
        <div className='topstyle'> 
          <div className='profiletag'>
            <div class="user-info">
              <img src="https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=800" alt="User Image" />
              <span class="user-name">Mrinmay Manna</span>
            </div>
          </div>
          <div className='shairicone' onClick={handleShareImage}>
            <img width="20" height="20" src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/external-share-interface-kiranshastry-solid-kiranshastry-1.png" alt="external-share-interface-kiranshastry-solid-kiranshastry-1" />
          </div>
        </div>

        <h3>My life is hell what can i do? {platform.name}- {platform.product}- {platform.description}</h3>


        <div className='topstyle'>
          <div className='profiletag'>
            <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} className="iconstyle" />
          </div>
          <div className='shairicone'>
            <img width="25" height="25" src={message} alt="chat-message--v1" />
            {/* <img width="20" height="20" src={greenTick} alt="approval--v1"/> */}
          </div>
        </div>
      </div>

      <div class="containertext">
        <div className='topstyle'>
          <div className='profiletag'>
            <div class="user-info">
              <img src="https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=800" alt="User Image" />
              <span class="user-name">Mrinmay Manna</span>
            </div>
          </div>
          <div className='shairicone' onClick={handleShareImage}>
            <img width="20" height="20" src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/external-share-interface-kiranshastry-solid-kiranshastry-1.png" alt="external-share-interface-kiranshastry-solid-kiranshastry-1" />
          </div>
        </div>

        <h3>Responsive Area Test</h3>
        <div class="mainimage-cards-container">
          <div class="">
            <img src="https://cdn.lifehacker.ru/wp-content/uploads/2019/05/Valley-of-Geysers_Olikbas-Shutterstock_1599819392.jpg" alt='headerimage' className='imageshow' />

          </div>
        </div>

        <div class="slovetext">
          <p>This is a responsive area for testing purposes.hfghdfghgfhWhat is Lorem Ipsum?
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          </p>
        </div>
        <div className='topstyle'>
          <div className='profiletag'>
            <img width="25" height="25" src={message} alt="chat-message--v1" />
          </div>
          <div className='shairicone'>

            <img width="20" height="20" src={greenTick} alt="approval--v1" />
          </div>
        </div>
      </div>
      <div class="containertext">
        <div className='topstyle'>
          <div className='profiletag'>
            <div class="user-info">
              <img src="https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=800" alt="User Image" />
              <span class="user-name">Mrinmay Manna</span>
            </div>
          </div>
          <div className='shairicone' onClick={handleShareImage}>
            <img width="20" height="20" src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/external-share-interface-kiranshastry-solid-kiranshastry-1.png" alt="external-share-interface-kiranshastry-solid-kiranshastry-1" />
          </div>
        </div>

        <h3>Responsive Area Test</h3>
        <div class="mainimage-cards-container">
          <div class="">
            <img src="https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt='headerimage' className='imageshow' />

          </div>
        </div>

        <div class="slovetext">
          <p>This is a responsive area for testing purposes.hfghdfghgfhWhat is Lorem Ipsum?
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          </p>
        </div>
        <div className='topstyle'>
          <div className='profiletag'>
            <img width="25" height="25" src={message} alt="chat-message--v1" />
          </div>
          <div className='shairicone'>

            <img width="20" height="20" src={greenTick} alt="approval--v1" />
          </div>
        </div>
      </div>


      {/* <Checkbox/>   */}

    </div>
  )
}
