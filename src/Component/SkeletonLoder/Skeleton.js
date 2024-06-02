import React from 'react';

import "./Skeleton.css"
export default function Skeleton({profile}) {
  return (
    <div className='allskeleton' >
    {profile ?(
      <>
      <div className="box" >
<div style={{flexDirection:"row",display:"flex"}}>
      <div className="profile-img" />
       <div className="skeleton-placeholder" style={{width:"212px",paddigLeft:"4px",marginLeft:"5px"}} />
       </div>
       </div>
      </>
    ):(
<>
<div className="box">
      <div style={{flexDirection:"row",display:"flex"}}>
      <div className="profile-img" />
       <div className="skeleton-placeholder" style={{width:"212px",paddigLeft:"4px",marginLeft:"5px"}} />
       </div>
      <div className="skeleton-placeholder" style={{height:"200px",marginTop:"9px"}} />
     
    </div>
    <div className="box" style={{marginTop:"5px"}}>
      <div style={{flexDirection:"row",display:"flex"}}>
      <div className="profile-img" />
       <div className="skeleton-placeholder" style={{width:"212px",paddigLeft:"4px",marginLeft:"5px"}} />
       </div>
      <div className="skeleton-placeholder" style={{height:"200px",marginTop:"9px"}} />
     
    </div>
    <div className="box" style={{marginTop:"5px"}}>
      <div style={{flexDirection:"row",display:"flex"}}>
      <div className="profile-img" />
       <div className="skeleton-placeholder" style={{width:"212px",paddigLeft:"4px",marginLeft:"5px"}} />
       </div>
      <div className="skeleton-placeholder" style={{height:"200px",marginTop:"9px"}} />
     
    </div>
</>
    )}
      
    </div>
  );
}