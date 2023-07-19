import React, { useEffect, useState, useRef } from 'react'

interface TypoActionProps {
  text: string
  pointText?: string
  className?: string
  pointColor?: string
  cursorText?: string
  cursorView?: boolean
  cursorColor?: string
  delay?: number
  speed?: number
}

const TypoAction: React.FC<TypoActionProps> = ({
  text,
  pointText = '',
  className,
  pointColor = 'red',
  cursorText = '|',
  cursorView = true,
  cursorColor = 'white',
  delay = 0,
  speed = 100
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [animationPlayed, setAnimationPlayed] = useState(false)
  const [cursorOpacity, setCursorOpacity] = useState(1)
  const textRef = useRef<HTMLSpanElement>(null)

  const applyPointText = (inputText: string) => {
    if (pointText) {
      const targetIndex = inputText.indexOf(pointText)
      if (targetIndex !== -1) {
        return (
          <>
            {inputText.slice(0, targetIndex)}
            <span style={{ color: pointColor }}>{pointText}</span>
            {inputText.slice(targetIndex + pointText.length)}
          </>
        )
      }
    }
    return inputText
  }

  const handleScroll = () => {
    if (textRef.current) {
      const windowHeight =
        'innerHeight' in window
          ? window.innerHeight
          : document.documentElement.offsetHeight
      const rect = textRef.current.getBoundingClientRect()
      const elemTop = rect.top
      const isVisible = elemTop <= windowHeight

      if (isVisible && !animationPlayed) {
        if (delay !== 0) {
          setTimeout(() => {
            setDisplayedText('')
            let index = 0
            const interval = setInterval(() => {
              if (index < text.length) {
                setDisplayedText((displayText) => {
                  if (displayText.length < text.length) {
                    return text.slice(0, index + 1)
                  }
                  return displayText
                })
                index++
              } else {
                clearInterval(interval)
              }
            }, speed)
          }, delay)
        } else {
          setDisplayedText('')
          let index = 0
          const interval = setInterval(() => {
            if (index < text.length) {
              setDisplayedText((displayText) => {
                if (displayText.length < text.length) {
                  return text.slice(0, index + 1)
                }
                return displayText
              })
              index++
            } else {
              clearInterval(interval)
            }
          }, speed)
        }
        setAnimationPlayed(true)
      } else if (!isVisible && animationPlayed) {
        let reversedIndex = text.length
        const reversedInterval = setInterval(() => {
          if (reversedIndex > -1) {
            setDisplayedText((displayText) => {
              if (displayText.length > 0) {
                return text.slice(0, reversedIndex)
              }
              return displayText
            })
            reversedIndex--
          } else {
            clearInterval(reversedInterval)
          }
        }, speed)
        setAnimationPlayed(false)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (cursorView) {
      const cursorInterval = setInterval(() => {
        setCursorOpacity((prevCursorOpacity) => 1 - prevCursorOpacity)
      }, 500)
      return () => {
        clearInterval(cursorInterval)
      }
    }
  }, [cursorView])

  return (
    <span className={className} ref={textRef}>
      {applyPointText(displayedText)}
      <span
        style={{
          marginLeft: '2px',
          color: cursorColor,
          opacity: cursorOpacity
        }}
      >
        {cursorText}
      </span>
    </span>
  )
}

export default TypoAction
