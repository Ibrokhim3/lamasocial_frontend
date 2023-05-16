import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import "./register.css";
import { PermMedia } from "@mui/icons-material";

export default function Register() {

    const [avatarUrl, setAvatarUrl] = useState("")
    const [coverUrl, setCoverUrl] = useState("")
    const [isDisabledAvatar, setIsDisabledAvatar] = useState(false);
    const [isDisabledCover, setIsDisabledCover] = useState(false);
    const [isDisabledUploadAvatar, setIsDisabledUploadAvatar] = useState(true);
    const [isDisabledUploadCover, setIsDisabledUploadCover] = useState(true);
    const [btnActive, setBtnActive] = useState(true);
    const [loading, setLoading] = useState(false);



    const styles = {
        backgroundColor: btnActive ? "red" : "blue"
      };

    const navigate = useNavigate()

    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const password2Ref = useRef()


    const uploadCover = async (evt)=>{
        setIsDisabledCover(true)
        setLoading(true);

        const file = evt.target.files
        const data = new FormData()

        data.append("file", file[0] )
        data.append("upload_preset", "lamasocial")

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dephdgqpo/image/upload",
            {
              method: "POST",
              body: data,
            }
          );

          const data2 = await res.json()

            setCoverUrl(data2.secure_url)
            setIsDisabledCover(false)    
            setIsDisabledUploadCover(false)
           setBtnActive(false);
           setLoading(false);

    }

    const uploadAvatar = async (evt)=>{
        setIsDisabledAvatar(true);
        setLoading(true);

        const file = evt.target.files
        const data = new FormData()

        data.append("file", file[0] )
        data.append("upload_preset", "lamasocial")

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dephdgqpo/image/upload",
            {
              method: "POST",
              body: data,
            }
          );

          const data2 = await res.json()

            setAvatarUrl(data2.secure_url)
            setIsDisabledAvatar(false)
            setIsDisabledUploadAvatar(false)    
           setBtnActive(false);
           setLoading(false);

    }   
       
    
    const handleFormSubmit = (evt)=>{
        evt.preventDefault()

        const user = {
            username: usernameRef.current.value,
            user_email: emailRef.current.value,
            password: passwordRef.current.value,
            password2: password2Ref.current.value,
            avatar_url: avatarUrl,
            cover_url: coverUrl

        }


        fetch("http://localhost:1200/lamasocial/registration", {
            method: "POST",
            headers: {"Content-type": "Application/json"},
            body: JSON.stringify(user)
        }).then((res)=>{
            if(res.status===201){
                return res.json()
            }
            return Promise.reject(res)
        }).then((data)=>{
            console.log(data);
            navigate("/login")
        })
    }





  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Lamasocial</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on Lamasocial
                </span>

            </div>
            <div className="loginRight">
                    <form onSubmit={handleFormSubmit} action="">
                <div className="loginBox">
                    <input ref={usernameRef} type="text" placeholder=" Username... " className="loginInput" />
                    <input ref={emailRef} type="email" placeholder=" Email... " className="loginInput" />
                    <input ref={passwordRef} type="password" placeholder=" Password... " className="loginInput" />
                    <input ref={password2Ref} type="password" placeholder=" Password again... " className="loginInput" />
                    <div className="upload-main-wrapper">
                    <span className="upload-avatar-wrapper">
                    <PermMedia htmlColor="tomato" className="shareIcon" />
                    <div type="click" className="upload-button"  data-toggle="modal" data-target="#avatarModal">
                    Upload avatar
                    </div>
                    </span>
                    <span className="upload-avatar-wrapper">
                    <PermMedia htmlColor="orange" className="shareIcon" />
                    <div className="upload-button" data-toggle="modal" data-target="#coverModal">
                    Upload cover image
                    </div>
                    </span>
                    </div>
{/* modal for avatar*/}
                    <div className="modal fade" id="avatarModal" role="dialog">

    <div className="modal-dialog">
    
      <div className="modal-content">
        <div className="modal-header">
          {/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}
          <h4 className="modal-title">1</h4>
        </div>
        <div className="modal-body">
          <p>Please upload your file here</p>
          <div className="input-spinner-wrapper">
          <input disabled={isDisabledAvatar} onChange={(evt)=>uploadAvatar(evt)} type="file" accept="image/*" />
          <span
                  style={loading ? { display: "block" } : { display: "none" }}
                  className="spinner"
                ></span>
          </div>
      
        </div>
        <div className="modal-footer">
          <button disabled={isDisabledUploadAvatar} style={ {styles}} type="button" className="btn btn-default" data-dismiss="modal">Submit</button>
        </div>
      </div>
      
    </div>
  </div>

  {/* modal for cover img */}
  <div className="modal fade" id="coverModal" role="dialog">

    <div className="modal-dialog">
    
      <div className="modal-content">
        <div className="modal-header">
          {/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}
          <h4 className="modal-title">1</h4>
        </div>
        <div className="modal-body">
          <p>Please upload your file here</p>
          <div className="input-spinner-wrapper">
          <input disabled={isDisabledCover} onChange={(evt)=>uploadCover(evt)} type="file" accept="image/*" />
          <span
                  style={loading ? { display: "block" } : { display: "none" }}
                  className="spinner"
                ></span>
          </div>
      
        </div>
        <div className="modal-footer">
          <button disabled={isDisabledUploadCover} style={ {styles}} type="button" className="btn btn-default" data-dismiss="modal">Submit</button>
        </div>
      </div>
      
    </div>
  </div>
                  
                    <button type="submit" className="loginButton">Sign Up</button>
                    
                    <Link to={"/login"} className="loginRegisterButton">Log into Account</Link>

                </div>
                    </form>

            </div>

        </div>

    </div>
  )
}
