import { useState } from 'react'
import './app.css';
import Crop from './crop'
import 'react-image-crop/dist/ReactCrop.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Crop/>
    </>
  )
}

export default App
