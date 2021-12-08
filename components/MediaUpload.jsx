import React, { useState, useEffect, useRef } from 'react';
import { Box, Button } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export default function MediaPreview({handleMediaUpload, mediaCount}) {

    const [images, setImages]= useState(undefined)
    const [imagesPreview, setImagesPreview]= useState(undefined)
    const [imgCount, setImgCount]= useState(0)
    const [maxImgNum, setMaxImgNum]= useState(1)
    const inputFileRef= useRef()

		useEffect(() => {
			setMaxImgNum(mediaCount)
		}, [mediaCount])
    
    // image preview  
    
      const handleImageUpload= e => {
    
        if (!e.target.files || e.target.files.length === 0) 
        {
          setImages(undefined)
          return
        }
    
        if(images !== undefined)
          setImages(prev => ( [...prev,  e.target.files[0]] ) )
        else
          setImages([e.target.files[0]])
    
      }
    
      useEffect(() => {

        //save uploaded images in parent component
        handleMediaUpload(images) 
    
        if (!images) {
          setImagesPreview(undefined)
          return
        }
    
        if( imgCount !== 0 && images.length < imgCount ){
    
          if(images.length === 0){
            setImages(undefined)
            setImagesPreview(undefined)
            //inputFileRef.current.value= null
          }
          setImgCount(prev => prev-1)
          return
        }
    
        const objectUrl = URL.createObjectURL(images[imgCount])
    
        if(imagesPreview !== undefined)
        {
            if(images[imgCount]['type'].split('/')[0] === 'image')
                setImagesPreview([...imagesPreview, {src: objectUrl, type: 'image'} ])
            else
                setImagesPreview([...imagesPreview, {src: objectUrl, type: 'video'}])
        }
        else
        {
            if(images[imgCount]['type'].split('/')[0] === 'image')  
                setImagesPreview([{src: objectUrl, type: 'image'}])
            else
                setImagesPreview([{src: objectUrl, type: 'video'}])
        }
    
        setImgCount(prev => prev+1)
    
      }, [images])
    
      useEffect(() => {
    
        return () => (
          imagesPreview !== undefined ? ( imagesPreview.map( preview => {
            URL.revokeObjectURL(preview)
          }) ) : ''
        )
      }, [])
    
      const removePreviewImg= (index) => {
    
        const temp1 = [...imagesPreview];
        const temp2 = [...images];
    
        temp1.splice(index, 1);
        temp2.splice(index, 1);
    
        setImagesPreview(temp1)
        setImages(temp2)
      }

    return (
        <Box my={2} style={{zIndex: 1}}>
            
            <Box style={{ display: 'flex', flexWrap: 'wrap', rowGap: 20}}>

                { 
                imagesPreview ? 
                    imagesPreview.map( (image, index) => (
                    <Badge style={{marginRight: 20}} badgeContent={<CancelTwoToneIcon color="primary" style={{cursor: 'pointer'}} onClick={ () => removePreviewImg(index) } />}>
                        <Box style={{width: 80, height: 80}}>
                            {
                                image.type === 'image' ? <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={image.src}/> 
                                : <video style={{width: '100%', height: '100%', objectFit: 'cover'}} src={image.src}/>
                            }
                        </Box>
                    </Badge> 
                    ))
                : null
                }

                {
                imgCount < maxImgNum ? (
                    <Box style={{width: 80, height: 80, background: '#1E1E2E'}}>
                    <Button component="label" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                        <AddCircleOutlineIcon style={{width: 50, height: 50, cursor: 'pointer',}} color="primary"/>
                        <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                        ref={inputFileRef}
                        />
                    </Button>
                    </Box>
                ) : null
                }

            </Box>

        </Box>
    )
}