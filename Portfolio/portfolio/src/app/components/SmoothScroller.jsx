'use client'

import { useLenis } from "lenis/react"

const SmoothScroller = ({children}) => {
    useLenis()
  return (
<>
{children}</>  )
}

export default SmoothScroller