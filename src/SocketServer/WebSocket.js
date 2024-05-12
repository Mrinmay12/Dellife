import { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { setNearUserData } from '../redux/action/NearAction';
import { useDispatch } from 'react-redux';
const WebSocket = ({ locationData, userId ,message_id}) => {
  const socket = useRef();
  const dispatch = useDispatch()
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
  
   
  }, [locationData, userId,message_id]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("nearUsers", (near_user) => {
    //get data in redux here
    dispatch(setNearUserData(near_user))
       console.log(near_user,"newdd_nearuser");
      });
    }
  }, []);
  return null; // This component doesn't render anything
};

export default WebSocket;
