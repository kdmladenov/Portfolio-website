import React, { PropsWithChildren, useEffect, useState } from "react"
import { Box, keyframes } from "@mui/material"

interface HeroOrbitProps {
  size: number
  rotation: number
  rotationSpeed: number
  shouldOrbit?: boolean
  shouldSpin?: boolean
  spinDuration?: string
}

const orbitAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const HeroOrbit: React.FC<PropsWithChildren<HeroOrbitProps>> = ({
  children,
  size,
  rotation,
  rotationSpeed,
  shouldOrbit = false,
  shouldSpin = false,
  spinDuration = "6s",
}) => {
  const [randomOffset, setRandomOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Generate random offset between -50 and 50 pixels
    setRandomOffset({
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
    })
  }, [])

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Box
        sx={{
          width: size,
          height: size,
          transform: `rotate(${rotation}deg) translate(${randomOffset.x}px, ${randomOffset.y}px)`,
          ...(shouldOrbit && {
            animation: `${orbitAnimation} ${rotationSpeed}s linear infinite`,
          }),
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            transform: `rotate(${rotation * -1}deg)`,
            ...(shouldSpin && {
              animation: `${spinAnimation} ${spinDuration} linear infinite`,
            }),
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}