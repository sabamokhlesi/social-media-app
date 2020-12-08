import React from'react'
import Spinner from '../spinner/spinner'
import './message-modal.scss'

const messageModal = (props) => {
    return (
        <div className='message-modal' {...props}>
            {props.loading?
            <Spinner/>:
            <React.Fragment>
                <h2>{props.children}</h2>
                <button className='btn btn-primary' onClick={props.closeClicked}>Close</button>
            </React.Fragment>
            }
            
        </div>
    )
}

export default messageModal