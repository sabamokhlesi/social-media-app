import React from'react'
import './spinner.scss'

const spinner = (props) => {
    return (
        <div class="loader">
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
    )
}

export default spinner