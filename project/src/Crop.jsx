import React from 'react'

const onselectfile=()=>{


}

const Crop = () => {
    return (
        <div>
            <label >
                <h1>Profile IMGGG</h1>
                <span>Choose your photo</span>
                <input
                    type="file"
                    accept='image/*'
                    onChange={onselectfile}
                ></input>

            </label>



        </div>
    )
}

export default Crop
