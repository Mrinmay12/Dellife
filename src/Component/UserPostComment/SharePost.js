import React from 'react'
import ShareIcon from "../Images/Share.svg";
export default function SharePost({postid}) {
    const handleShareImage =async () => {
        // if(!isMobile){
        //   setIsModalOpenShare(true)
        // }else{
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Image Sharing',
              text: 'Check out this image!',
              url: `/sharepost/${postid}`,
            });
            console.log('Shared successfully');
          } catch (error) {
            console.error('Error sharing:', error);
          }
        } else {
          console.log('Web Share API not supported');
        }
        // Check if the Web Share API is supported in the browser.
        // if (navigator.share) {
      
        //   navigator.share({
        //     title: 'Image Sharing',
        //     text: 'Check out this image!',
        //     url: `/sharepost/${postid}`,
        //   })
        //     .then(() => console.log('Shared successfully'))
        //     .catch((error) => console.error('Error sharing:', error));
        // } else {
        //   alert('Web Share API is not supported in this browser.');
        // }
      // }
      };
  return (
    <div onClick={()=>handleShareImage()}>
         <img src={ShareIcon} className="iconstyle"/>
    </div>
  )
}
