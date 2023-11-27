import React from 'react'
import "./UserCard.css"
import MessageIcon from "./message.png" 
import ConnectIcon from "./connection.png"
export default function UserCard() {
  return (
    <div>
   <body> 
     <div class="wrapper">
          <div class="containeruser">
               <div class="banner-image"></div>
               <img src="https://placekitten.com/300/300" alt="" class="profile-image"/>
               <h1 class="name">Keith Kitten</h1>
               <p class="description">My name is not Keith, but I am a Kitten. This is just basically dummy text. Do not be fooled by the dogs - Cats rule, dogs drool!</p>
               <div class="bottonbtn">
               <p><img src={ConnectIcon} style={{ height: "31px" }}/>Connect</p>
    <p><img src={MessageIcon} style={{ height: "25px" }}/>Message</p>
               </div>
             
          </div>
        
          <div class="containeruser">
               <div class="banner-image"></div>
               <img src="https://placekitten.com/300/300" alt="" class="profile-image"/>
               <h1 class="name">Keith Kitten</h1>
               <p class="description">My name is not Keith, but I am a Kitten. This is just basically dummy text. Do not be fooled by the dogs - Cats rule, dogs drool!</p>
               <div class="bottonbtn">
               <p><img src={ConnectIcon} style={{ height: "31px" }}/>Connect</p>
    <p><img src={MessageIcon} style={{ height: "25px" }}/>Message</p>
               </div>
             
          </div>
          <div class="containeruser">
               <div class="banner-image"></div>
               <img src="https://placekitten.com/300/300" alt="" class="profile-image"/>
               <h1 class="name">Keith Kitten</h1>
               <p class="description">My name is not Keith, but I am a Kitten. This is just basically dummy text. Do not be fooled by the dogs - Cats rule, dogs drool!</p>
               <div class="bottonbtn">
               <p><img src={ConnectIcon} style={{ height: "31px" }}/>Connect</p>
    <p><img src={MessageIcon} style={{ height: "25px" }}/>Message</p>
               </div>
             
          </div>
     </div>
     </body>
    </div>

  )
}
