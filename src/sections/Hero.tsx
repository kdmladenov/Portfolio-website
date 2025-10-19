import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Link,
  Chip
} from "@mui/material";

import { HeroOrbit } from "../components/HeroOrbit";
import grainImage from "../assets/images/grain.jpg";
import star from "../assets/icons/star.svg?url";
import sparkle from "../assets/icons/sparkle.svg?url";
import contactsList from "@/constants/contactsList";

// ------------------
// Reusable Icon Components
// ------------------
const IconWrapper: React.FC<{
  size: number;
  opacity?: number;
  children: React.ReactNode;
}> = ({ size, opacity = 1, children }) => (
  <Box
    sx={{
      width: size,
      height: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "primary.main",
      opacity
    }}
  >
    {children}
  </Box>
);

const StarIcon = ({ size }: { size: number }) => (
  <IconWrapper size={size}>
    <Box
      component="img"
      src={star}
      sx={{ width: size, height: size, objectFit: "contain", color: "yellow" }}
    />
  </IconWrapper>
);

const SparkleIcon = ({ size }: { size: number }) => (
  <IconWrapper size={size}>
    <Box
      component="img"
      src={sparkle}
      sx={{ width: size, height: size, objectFit: "contain", color: "yellow" }}
    />
  </IconWrapper>
);

// ------------------
// Helper Components
// ------------------
const OrbitDot = ({ size }: { size: number }) => (
  <Box
    sx={{
      width: size,
      height: size,
      backgroundColor: "primary.main",
      opacity: 0.2,
      borderRadius: "50%"
    }}
  />
);

// ------------------
// Main Hero Section
// ------------------
export const HeroSection: React.FC = () => {
  const handleScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const orbitElements = [
    { size: 800, rotation: -72, speed: 60, child: <StarIcon size={112} /> },
    { size: 550, rotation: 20, speed: 42, child: <StarIcon size={48} /> },
    { size: 590, rotation: 98, speed: 34, child: <StarIcon size={32} /> },
    { size: 430, rotation: -14, speed: 26, child: <SparkleIcon size={32} /> },
    { size: 440, rotation: 79, speed: 78, child: <SparkleIcon size={20} /> },
    { size: 530, rotation: 178, speed: 90, child: <SparkleIcon size={40} /> },
    { size: 720, rotation: 178, speed: 32, child: <SparkleIcon size={12} /> },
    { size: 720, rotation: 85, speed: 0, child: <OrbitDot size={12} /> },
    { size: 720, rotation: -41, speed: 0, child: <OrbitDot size={8} /> },
    { size: 720, rotation: -5, speed: 0, child: <OrbitDot size={8} /> }
  ];

  return (
    <Box
      id="home"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        height: "100vh"
      }}
    >
      {/* Background + Rings */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -10,
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${grainImage})`,
            opacity: 0.05,
            zIndex: -30
          },
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            maskImage: "linear-gradient(to bottom, black 50%, transparent)",
            zIndex: -20
          }
        }}
      >
        {[620, 820, 1020, 1220].map((size) => (
          <Box
            key={size}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: size,
              height: size,
              border: "1px solid rgba(16, 185, 129, 0.1)",
              borderRadius: "50%"
            }}
          />
        ))}

        {orbitElements.map(({ size, rotation, speed, child }, i) => (
          <HeroOrbit
            key={i}
            size={size}
            rotation={rotation}
            rotationSpeed={speed}
            shouldOrbit
            shouldSpin={speed > 0}
            spinDuration="6s"
          >
            {child}
          </HeroOrbit>
        ))}
      </Box>

      {/* Foreground */}
      <Box
        sx={{
          maxWidth: "80rem",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
          px: 2
        }}
      >
        <Box display="flex" alignItems="center" flexDirection="column">
          <Avatar
            src="https://media.licdn.com/dms/image/v2/D4D03AQGR3uSe5YRcnA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1670961706827?e=1762387200&v=beta&t=SleJ4cMaGgGDKtobBDmleO3XZOR6k7OaX1XObd8ojOc"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
        </Box>

        <Box sx={{ maxWidth: "36rem", mx: "auto", textAlign: "center" }}>
          <Typography
            variant="h1"
            sx={{
              mt: 4,
              letterSpacing: "0.025em",
              fontSize: { xs: "2rem", md: "3rem" }
            }}
          >
            Krasimir Mladenov
          </Typography>
          <Typography
            sx={{
              mt: 2,
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.125rem" }
            }}
          >
            React Front-End Developer
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.125rem" }
            }}
          >
            Passionate about Creating Intuitive Web Applications
          </Typography>
        </Box>

        {/* Contacts */}
        <Stack
          direction="row"
          marginTop={5}
          spacing={2}
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          {contactsList.map((contact) =>
            contact.href ? (
              <Link
                key={contact.title}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
              >
                <Chip
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: "transparent",
                        color: "primary.main",
                        width: 24,
                        height: 24
                      }}
                    >
                      <i className={contact.icon} aria-hidden="true" />
                    </Avatar>
                  }
                  label={contact.title}
                  variant="outlined"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.main"
                    }
                  }}
                />
              </Link>
            ) : (
              <Chip
                key={contact.title}
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: "transparent",
                      color: "primary.main",
                      width: 24,
                      height: 24
                    }}
                  >
                    <i className={contact.icon} aria-hidden="true" />
                  </Avatar>
                }
                label={contact.title}
                variant="outlined"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  borderColor: "rgba(255, 255, 255, 0.3)"
                }}
              />
            )
          )}
        </Stack>
      </Box>
    </Box>
  );
};
