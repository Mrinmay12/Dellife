import { useRef, useEffect } from 'react';
import io from 'socket.io-client';

const WebSocket = ({ locationData, userId ,message_id}) => {
  const socket = useRef();

  useEffect(() => {
    // Initialize socket connection
    socket.current = io(process.env.REACT_APP_SOCKET_URL);

    // Emit userLocation when locationData changes
    if (locationData && message_id) {
      socket.current.emit("userLocation", locationData);
    }

    // Emit add-user with user_id
    if (userId) {
      socket.current.emit("add-user", userId);
    }

    // Clean up on unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [locationData, userId,message_id]);

  return null; // This component doesn't render anything
};

export default WebSocket;
