import ModalScreen from "../UI/ModalScreen"
import { useRef, useState } from "react"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUpForm = (props) => {
    const username = useRef()
    const password = useRef()
    const password2 = useRef()

    //console.log(props.firebaseConn)
    const fbApp = props.firebaseConn
    const fbAuth = getAuth(fbApp)
    //console.log(fbAuth)
    //const fbAuth = props.firebaseConn.auth();
    //console.log(fbAuth)
    //const app = initializeApp(props.firebaseConfig);
    //console.log(app)
    
    //const analytics = getAnalytics(app);

    

    const navigate = useNavigate()

    const [formMessage, setFormMessage] = useState("")
    const [formSubmitted, setFormSubmitted] = useState(false)

    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log('form submitted')
        if (password.current.value !== password2.current.value) {
            setFormMessage("Passwords do not match")
            setFormSubmitted(false)
        } else if (password.current.value.length < 8) {
            setFormMessage("Password must be at least 8 characters")
            setFormSubmitted(false)
        } else if (!regularExpression.test(password.current.value)) {
            setFormMessage("Password should contain at least one number and one special character")
            setFormSubmitted(false)
        } else {
            //Singing Up into Firebase
            createUserWithEmailAndPassword(fbAuth, username.current.value,password.current.value).then((userCredential)=>{
                console.log(userCredential)
            }).catch((error)=>{
                console.log(error)
            })
            setFormMessage("Welcome!")
            setFormSubmitted(true)
            setTimeout(function() {
                props.onUserLogin();
                onCloseHandler()
            }, 2000)
            
        }
    }

    // if (setFormSubmitted) {
    //     setInterval(props.onUserLogin(), 2000);
    //     onCloseHandler();
    // }

    const onCloseHandler = () =>{
        navigate(-1)
    }

    return <ModalScreen title="Sign Up">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input ref={username} className="form-control" type="email" id="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input ref={password} className="form-control" type="password" id="password" />
              {/* <div className="invalid-feedback">Password not strong enough</div> */}
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input ref={password2} className="form-control" type="password" id="password2" />
              {/* <div className="invalid-feedback">Password does not match</div> */}
            </div>
            <br />
            <Button className="m-1" variant="secondary" onClick={onCloseHandler}>
                Close
            </Button>
            <Button className="m-1" type="submit" variant="primary">
              Sign Up
            </Button>
            {(formSubmitted && formMessage === "Welcome!" ) && (<div className="alert alert-success">
                                                                <strong>{formMessage}</strong>
                                                                </div>)}
            {(!formSubmitted && formMessage !== "Welcome!" && formMessage !== "") && (<div className="alert alert-danger">
                                                                                        <strong>{formMessage}</strong>
                                                                                    </div>)}
        </form>
    </ModalScreen>
}
export default SignUpForm