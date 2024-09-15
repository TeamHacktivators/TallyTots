import './demo.css'
import Before from '../../assets/before.jpg'
import Line from '../../assets/line.png'
import After from '../../assets/after.jpg'
import Video from '../../assets/demo_video.mp4'

export default function Demo() {
  return (
    <div className='demo' id="demo">
      <div className="demo-top">
        <div className="demo-left">
          <h1>Demo</h1>
          <p>
          The video highlights the app's speed, accuracy, and simple interface, giving a clear overview of how it automates and streamlines inventory management.
          </p>
        </div>
        <div className="demo-right">
          <div className="video">
            <video className="video" controls loop src={Video} autoPlay></video>
          </div>
        </div>
      </div>
      <div className="demo-bottom">
        <div className='progress'>
          <img src={Before} className="before" />
          <img src={Line} className="line"/>
          <img src={After} className="after" />
        </div>
      </div>
    </div>
  )
}
