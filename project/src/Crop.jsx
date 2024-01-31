import React, { useState,useRef  } from 'react'
import ReactCrop, { makeAspectCrop,centerCrop, convertToPixelCrop } from 'react-image-crop';
import Button from 'react-bootstrap/Button';
import setCanvasPreview from './setCanvasPreview';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;



const Crop = () => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc,setimgSrc] = useState('')
    const [cropp,setcropp] = useState( )
    const [error,seterror] = useState('');


    const onselectfile=(e)=>{
        const file = e.target.files?.[0];
        if(!file) return;
        
        const reader = new FileReader();
        reader.addEventListener("load",()=>{
            const imageUrl = reader.result?.toString() || "";
            console.log(imageUrl);
            setimgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };

    
    const onImageLoad =(e)=>{
        const {width,height,naturalWidth,naturalHeight} = e.currentTarget; //naturalWidth,naturalHeight กำหนดpixel size of image(150x150)
        if(error) seterror("");
        if(naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION){
            seterror("Image must be at least 150 X 150 pixel.");//error check size image
            setimgSrc("");
            return;
        }

        const cropWidthinpercent = (MIN_DIMENSION / width) * 100; //แก้ไข กรณี img 150x150 cropจะเล็ก 

        const crop = makeAspectCrop(
            {
                unit: '%',
                width: cropWidthinpercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop,width,height);
        setcropp(centeredCrop);

    };

    return (
        <div>
            <label >
                <h1>Profile IMGGG</h1>
                <span>Choose your photo </span>
                <input
                    type="file" 
                    accept='image/*'
                    onChange={onselectfile}
                ></input>

            </label>
            {error && <p>{error}</p>} 
            {imgSrc && (
                <div className='flex flex-col items-center'>
                    <ReactCrop
                      crop={cropp}
                      onChange={(pixelCrop,percentCrop) => setcropp(percentCrop)}//move crop pixel ใช้ percent เพราะเวลาresponsiveจอ crop จะอยู่ที่เดิม
                      circularCrop
                      keepSelection
                      aspect={ASPECT_RATIO}
                      minWidth={MIN_DIMENSION}
                    
                    >  
                    <img 
                       ref={imgRef}
                       src={imgSrc} alt="Upload" style={{ maxHeight: "70vh" }}
                      onLoad={onImageLoad}
                    
                    />

                    </ReactCrop>

                    <br/>

                    <Button variant="outline-primary" 
                      onClick={() => {
                        setCanvasPreview(
                            imgRef.current,
                            previewCanvasRef.current,
                            convertToPixelCrop(
                                cropp,
                                imgRef.current.width,
                                imgRef.current.height
                            )
                        ) 
                    } }>Crop Image</Button>
                
                </div>

            )}

            <br/>
            {cropp &&  // preview รูปcrop
            <canvas 
                ref = {previewCanvasRef}
                className='mt-4'
                style={{
                    border: '1px solid black',
                    objectFit: 'contain',
                    width: 150,
                    height: 150,
                }}
            />

            }



        </div>
    )
}

export default Crop
