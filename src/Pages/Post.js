import React ,{useEffect}from 'react'
import UploadPost from "../Component/UploadPost/Post"
export default function Post() {
   useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Display a custom message before unloading
      alert('Are you sure you want to leave this mm page?');

      // Cancel the event
      event.preventDefault();
      // Standard-compliant browsers
      event.returnValue = '';
    };

    // Add the event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  return (
    <div >
  <UploadPost/>
    </div>
  )
}
