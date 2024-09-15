import React from 'react'
import './hero.css'
import Check from '../../assets/check.jpg'
import Demo from '../demo/demo.jsx'
import Logo from '../../assets/logo_final.png'
import RightBG from '../../assets/right-bg.png' 
import {Link} from 'react-router-dom'


export default function Hero() {
  return (
    <div className="hero-cn">
      <div className="hero">
        <div className="hero-left">
            <div className="left-heading">
              <img src={Check} className="check" />
              <h1>Tally Tots</h1>
              <h4>By Hacktivators</h4>
            </div>
            <p className="left-desc">
            <b>Tally Tot</b> is an innovative inventory app that leverages Deep Learning to simplify object counting and identification. By analyzing images, Tally Tot accurately detects and counts objects, making inventory management efficient and seamless.</p>
            <p className="left-desc">Whether it's tracking stock in warehouses, retail, or other environments, this app automates the process, saving time and reducing human error. Simply snap a photo, and let Tally Tot do the rest!
            </p>
        </div>
        <div className="hero-right">
            <div className="right-bg-cn">
              <div className="glass"></div>
              <img src={RightBG} className="right-bg" />
            </div>
            <div className='right-main'>
              <img src={Logo} className="logo-in-right" />
              <Link to="/test"><button className="try-now">Try Now</button></Link>
              <a href='#demo' className='view-demo'><span>or view demo...</span></a>
            </div>  
        </div>
      </div>
      <Demo />
    </div>
  )
}

