import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Toggle button visibility based on scroll position
  const handleScroll = useCallback(() => {
    setIsVisible(window.scrollY > 300);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: isVisible ? "block" : "none"
      }}
    >
      <IconButton
        onClick={scrollToTop}
        aria-label="Scroll to top"
        sx={{
          position: "fixed",
          bottom: isMobile ? 16 : 32,
          left: isMobile ? 16 : "auto",
          right: isMobile ? "auto" : 32,
          zIndex: 40,
          backgroundColor: "white",
          color: "gray",
          boxShadow: 3,
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
            transform: "translateY(-2px)"
          },
          transition: "all 0.2s ease-in-out"
        }}
      >
        <KeyboardArrowUp sx={{ fontSize: 24 }} />
      </IconButton>
    </motion.div>
  );
};
