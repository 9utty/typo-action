import React, { useEffect, useState, useRef } from 'react'

interface TypoActionProps {
  text: string
  pointText?: string
  className?: string
  pointColor?: string
  cursorText?: string
  cursorView?: boolean
  delay?: number
  speed?: number
}

const TypoAction: React.FC<TypoActionProps> = ({
  text,
  pointText,
  className,
  pointColor = 'red',
  cursorText = '|',
  cursorView = true,
  delay = 0,
  speed = 100
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(cursorView)
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

      const playTextAnimation = () => {
        let index = 0
        const interval = setInterval(() => {
          if (index < text.length) {
            setDisplayedText(text.substring(0, index + 1))
            index++
          } else {
            clearInterval(interval)
          }
        }, speed)
      }

      if (isVisible) {
        // 화면 내에 들어오면, 텍스트 애니메이션 재생
        if (delay !== 0) {
          setTimeout(() => {
            playTextAnimation()
          }, delay)
        } else {
          playTextAnimation()
        }
      } else {
        // 화면 밖에 있으면, 텍스트 애니메이션 역재생
        let reversedIndex = text.length
        const reversedInterval = setInterval(() => {
          if (reversedIndex > -1) {
            setDisplayedText(text.substring(0, reversedIndex))
            reversedIndex--
          } else {
            clearInterval(reversedInterval)
          }
        }, speed)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [displayedText])

  useEffect(() => {
    if (cursorView) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prevShowCursor) => !prevShowCursor)
      }, 1000)
      return () => {
        clearInterval(cursorInterval)
      }
    }
  }, [cursorView])

  return (
    <span className={className} ref={textRef}>
      {applyPointText(displayedText)}
      <span style={showCursor ? { marginLeft: '2px' } : { display: 'none' }}>
        {cursorText}
      </span>
    </span>
  )
}

export default TypoAction
