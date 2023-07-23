/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'

interface CursorProps {
  cursorText?: string
  cursorColor?: string
}

const Cursor: React.FC<CursorProps> = ({
  cursorText = '|',
  cursorColor = 'white'
}) => {
  const [cursorOpacity, setCursorOpacity] = useState<number>(1)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorOpacity((state) => (state === 0 ? 1 : 0))
    }, 500)

    return () => {
      clearInterval(cursorInterval)
    }
  }, [])

  return (
    <span
      style={{
        opacity: cursorOpacity,
        paddingLeft: '3px',
        color: cursorColor
      }}
    >
      {cursorText}
    </span>
  )
}

export default Cursor
