import ModalScreen from "../UI/ModalScreen"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignOutWarning = (props) => {
    const [isLoggedOut, setIsLoggedOut] = useState(false)

    const navigate = useNavigate()

    const onCloseHandler = () => {
        navigate(-1)
    }

    const onLogoutHandler = () => {
        setIsLoggedOut(true)
        setTimeout(function () {
            props.onUserLogout();
            navigate(-1)
        }, 2000)
    }

    return <ModalScreen title="Sign Out" btnText="">
        <p>Are you sure you want to sign out?</p>
        <Button className="m-1" variant="secondary" onClick={onCloseHandler}>
            Close
        </Button>
        <Button className="m-1" variant="primary" onClick={onLogoutHandler}>
            Sign Out
        </Button>
        {isLoggedOut && (<div className="alert alert-success"><strong>Thank You! See you later</strong></div>)}
    </ModalScreen>
}

export default SignOutWarning