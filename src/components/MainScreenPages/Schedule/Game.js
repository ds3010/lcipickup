import { useState } from "react"

const Game = (props) => {
    const [isActive, setIsActive] = useState(false)

    console.log(props.data.options)
    
    const expandOrCollapse = () => {
        setIsActive(prev => {
            return !prev
        })
    }

    return (
    <div className="card container">
        <div className="d-flex justify-content-between card-header">
            <h5>
                <a
                    href="#collapse1"
                    data-parent="#accordion"
                    data-toggle="collapse"
                    className="align-top"
                    onClick={expandOrCollapse}
                >
                    {props.data.date}
                </a>
            </h5>
            {isActive ? 
                <h5 role="button" className="align-top" onClick={expandOrCollapse}>-</h5> : 
                <h5 role="button" className="align-top" onClick={expandOrCollapse}>+</h5>
            }
        </div>

        {isActive && <div id="collapse1" className="collapse show">
            <div className="card-body">
                {props.data.options.map((option) =>                
                    // <div class="form-check">
                    //     <input class="form-check-input" type="radio" name={option.time} id={option.date}/>
                    //     <label class="form-check-label" for={option.date}> {option.time} </label>
                    // </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name={option.date} id={option.date}/>
                        <label class="form-check-label" for={option.date}> {option.time}<p className="d-inline text-monospace">({option.price})</p></label>
                    </div>
                )}
            </div>
            <button class="btn btn-secondary col-12 disabled" type="button">Play!</button>
        </div>}
    </div>)
}

export default Game