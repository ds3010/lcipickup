import { Button } from "react-bootstrap"
import AuthContext from "../../Authentication/Context/auth-context"
import { useContext } from "react"

const User = (props) => {

    const authCtx = useContext(AuthContext)

    //console.log(props.firebaseConn)
    return ((authCtx.email === props.user.email) ? <li className="list-group-item list-group-item-danger">
        <div className="row">
            <div className="col-sm text-start" >
                <strong>
                    {props.user.email}
                </strong>
            </div>
            <div className="col-sm text-center" >
                {props.user.firstName} {props.user.lastName}
            </div>
            {props.user.isAdmin 
                ? <div className="col-sm text-end" >
                    <strong className="text-danger">Admin</strong>
                </div>
                : <div className="col-sm text-end" >
                    <Button className="btn-success">Make Admin</Button>
                </div>
            }
        </div>
    </li> : <li className="list-group-item">
        <div className="row">
            <div className="col-sm text-start" >
                <strong>
                    {props.user.email}
                </strong>
            </div>
            <div className="col-sm text-center" >
                {props.user.firstName} {props.user.lastName}
            </div>
            {props.user.isAdmin 
                ? <div className="col-sm text-end" >
                    <strong className="text-danger">Admin</strong>
                </div>
                : <div className="col-sm text-end" >
                    <Button className="btn-success">Make Admin</Button>
                </div>
            }
        </div>
    </li>)
}

export default User