import React, { useState,useRef } from 'react'
import './Vgallery.css'
import vData from './data.json'
import playing from '../images/play-button.png'

const Vgallery = () => {
    const [vidData, setVidData] = useState(vData)
    const [activeVideo, setActiveVideo] = useState(vidData[0].videoUrl)
    const [activeThumbnail, setActiveThumbnail] = useState(vidData[0].thumbnailUrl)
    const [activeId, setActiveId] = useState(vidData[0].id)
    const [activeTitle, setActiveTitle] = useState(vidData[0].title)
    const [activeDate, setActiveDate] = useState(vidData[0].uploadTime)
    const [activeDesc, setActiveDesc] = useState(vidData[0].description)
    const videoRef = useRef();

    const playVideo = (vidDetails) => {
        let videoPlay = videoRef.current;
        setActiveVideo(vidDetails.videoUrl)
        setActiveThumbnail(vidDetails.thumbnailUrl)
        setActiveId(vidDetails.id)
        setActiveTitle(vidDetails.title)
        setActiveDate(vidDetails.uploadTime)
        setActiveDesc(vidDetails.description)
        videoPlay.load();
        videoPlay.play();
    }

  return (
    <div className='v-gallery-screen'>
        <div className='v-gallery-container'>
        <div className='v-player'>
            <video className='v-palyer' 
                    ref={videoRef}controls poster= 
                {activeThumbnail}> 
                <source src= {activeVideo} type="video/mp4" /> 
            </video>
        </div>
            <div className='v-description'>
                <p className='v-title'>{`#${activeId} ${activeTitle}`}</p>
                <p className='v-date'>{activeDate}</p>
                <p className='v-desc'>{activeDesc}</p>
            </div>
            <div className='v-hirizontal-scroll-section'>
                {vidData.map((item, index) => {
                    return (
                        <div className='scroll-bar-videos' key={index} onClick={()=> playVideo(item)}><img className="v-thumbnail" src={item.thumbnailUrl} /><img className={activeId === item.id ? "v-thumbnail-img-active": "v-thumbnail-img"} src={playing} /></div>
                    )
                })
                }
            </div>
        </div>
    </div>
  )
}

export default Vgallery
