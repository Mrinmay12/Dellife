import React, { useEffect, useState } from 'react'
import "./PostForm.css"
import Texteditor from '../UploadPost/TextEditor/Texteditor'
export default function PostForm({setJson}) {
    const [text, setText] = useState("")
    const [textcolor, settextcolor] = useState("black")
    const[textstyle,settextstyle]=useState("1")

    const[title,setTitle]=useState("")
    const [textcolor2, settextcolor2] = useState("")
    const[textstyle2,settextstyle2]=useState("1")
    const OnChnage = (e) => {
        setText(e.target.value)
    }
    const handleChangtitle=(e)=>{
        setTitle(e.target.value)
    }
    useEffect(()=>{
        setJson({
            text,textcolor,textstyle 
        })
    },[text,textcolor,textstyle])
  
    return (
        <div>


            <div id="form">



                <form id="waterform" method="post"> 
                    {/* <Texteditor setTextcolorget={settextcolor2} settextstyle={settextstyle2}/>
                    <div class="formgroup" id="name-form">
                        <label className='label' for="name">Title</label>
                        <input type="text" className={textstyle2==="1"?'input':textstyle2==="2"?"input2":"input3"} style={{ color: textcolor2 === "" ? "black" : textcolor2 }} id="name" name="name" placeholder="Enter Title" value={title} onChange={handleChangtitle}/>
                    </div> */}
                    <Texteditor setTextcolorget={settextcolor} settextstyle={settextstyle}/>
                    <div class="formgroup" id="message-form">
                        <label className='label' for="message">Discription</label>
                        <textarea id="message" className={textstyle==="1"?"textarea" :textstyle==="2"?"textarea2":"textarea3"} name="message" style={{ color: textcolor === "" ? "black" : textcolor }} value={text} placeholder="Write something...." onChange={OnChnage}></textarea>
                    </div>


                </form>
            </div>
        </div>
    )
}
