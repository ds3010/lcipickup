import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Profile = () => {

    const [profileChanged, setProfileChanged] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setProfileChanged(true)
        setTimeout(function () {
            onCloseHandler();
        },2000)
    }

    const onCloseHandler = () => {
        navigate('/')
    }

    return (<div className="container">
        <div className="text-center"><h4>My Profile</h4></div>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="displayname">Display Name</label>
          <input className="form-control" type="text" id="displayname" />
        </div>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input className="form-control" type="text" id="firstname" />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input className="form-control" type="text" id="lastname" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input  className="form-control" type="password" id="password" placeholder='Leave it blank if you do not want to change it'/>
          {/* <div className="invalid-feedback">Password not strong enough</div> */}
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input  className="form-control" type="password" id="password2" placeholder='Leave it blank if you do not want to change it'/>
          {/* <div className="invalid-feedback">Password does not match</div> */}
        </div>
        <br />
        <div>
            <Button className="m-1" variant="secondary" onClick={onCloseHandler}>
                Cancel
            </Button>
            <Button className="m-1" type="submit" variant="primary">
            Accept Changes
            </Button>
            {profileChanged && <div className="alert alert-success">
                                <strong>"Changes Accepted"</strong>
                                </div>}
        </div>
      </form>
    </div>)
}

export default Profile