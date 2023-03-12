import ModalScreen from "../UI/ModalScreen"
import { useRef, useState } from "react"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const SignInForm = (props) => {
    const username = useRef()
    const password = useRef()

    const navigate = useNavigate()

    const [formMessage, setFormMessage] = useState("")
    const [formSubmitted, setFormSubmitted] = useState(false)

    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log('form submitted')
        if (password.current.value.length < 8) {
            setFormMessage("Password must be at least 8 characters")
            setFormSubmitted(false)
        } else if (!regularExpression.test(password.current.value)) {
            setFormMessage("Password should contain at least one number and one special character")
            setFormSubmitted(false)
        } else {
            setFormMessage("Welcome Back!")
            setFormSubmitted(true)
            setTimeout(function() {
                props.onUserLogin();
                onCloseHandler()
            }, 2000)
            
        }
    }

    const onCloseHandler = () =>{
        navigate(-1)
    }

    return <ModalScreen title="Sign In">
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
            <br />
            <Button className="m-1" variant="secondary" onClick={onCloseHandler}>
                Close
            </Button>
            <Button className="m-1" type="submit" variant="primary">
              Sign In
            </Button>
            {(formSubmitted && formMessage === "Welcome Back!" ) && (<div className="alert alert-success">
                                                                <strong>{formMessage}</strong>
                                                                </div>)}
            {(!formSubmitted && formMessage !== "Welcome Back!" && formMessage!=="") && (<div className="alert alert-danger">
                                                                                        <strong>{formMessage}</strong>
                                                                                    </div>)}
        </form>
    </ModalScreen>
}
export default SignInForm