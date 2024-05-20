import React from 'react'
import { FallingLines } from "react-loader-spinner";


function Loader() {
    return (
        <div style={{ textAlign: "center" }}>
            <FallingLines
                color="#03a9f4"
                width="150"
                visible={true}
                ariaLabel="falling-circles-loading"
            /></div>
    )
}

export default Loader