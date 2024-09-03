import React ,{useEffect}from 'react'
import UploadPost from "../Component/UploadPost/Post"
export default function Post({only_use,onClose}) {
  useEffect(() => {
    const handleReload = (event) => {
      // Prevent the default behavior of the event
      event.preventDefault();

      // Optionally, you can display a message to the user
      const confirmationMessage = 'Reloading is disabled for this page.';
      event.returnValue = confirmationMessage;

      return confirmationMessage;
    };

    // Add event listeners to disable reload
    window.addEventListener('beforeunload', handleReload);
    window.addEventListener('unload', handleReload);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleReload);
      window.removeEventListener('unload', handleReload);
    };
  }, []);
  
  return (
    <div style={{alignContent:"center",display:"flex" }}>
  <UploadPost only_use={only_use} onClose={onClose}/>
    </div>
  )
}
