import React, { useEffect, useState } from 'react'

const WindowSize = () => {

  const [windowWidth, setWidth] = useState<React.SetStateAction<number>>(0)
  const [windowHeight, setHeight] = useState<React.SetStateAction<number>>(0)

  const handleResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    handleResize()
  }, [])

  return {
    windowWidth,
    windowHeight
  }

}

export default WindowSize