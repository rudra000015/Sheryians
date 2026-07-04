import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
gsap
const App = () => {
  const boxRef = useRef([])
  const containerRef = useRef(null)
  const { contextSafe } = useGSAP(() => {
    gsap.to(boxRef.current, {
      x: 500,
      duration: 1.2,
      delay: 0.5
    })
  }, { scope: containerRef.current, dependencies: [] })
  return (
    <div ref={containerRef}>
      <div ref={(el) => {
        boxRef.current.push(el)
      }} className="box">
      </div>
      <div ref={(el) => {
        boxRef.current.push(el)
      }} className="box">
      </div>
      <div ref={(el) => {
        boxRef.current.push(el)
      }} className="box">
      </div>
    </div>
  )
}

export default App