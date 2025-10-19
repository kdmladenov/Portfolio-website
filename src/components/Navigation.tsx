import React, { useEffect, useState, useCallback } from "react";
import { throttle } from "lodash";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Backdrop
} from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// -------------------------
// 🔧 Constants & Helpers
// -------------------------
const SECTIONS = ["home", "experience", "projects", "about"];
const SCROLL_OFFSET = 100;
const SCROLL_THRESHOLD_RATIO = 0.3;

// -------------------------
// 🧱 Styled Components
// -------------------------
const NavigationContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 12,
  width: "100%",
  zIndex: 50,
  padding: "0 16px",
  [theme.breakpoints.up("md")]: { display: "block" },
  [theme.breakpoints.down("md")]: { display: "none" }
}));

const NavigationBar = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 4,
  padding: 2,
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: "999px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  margin: "0 auto",
  maxWidth: "fit-content"
}));

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active"
})<{ active?: boolean }>(({ active }) => ({
  padding: "6px 16px",
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "none",
  minWidth: "auto",
  ...(active
    ? {
        backgroundColor: "white",
        color: "gray.900",
        "&:hover": { backgroundColor: "white" }
      }
    : {
        color: "white",
        "&:hover": { color: "primary.main" }
      })
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  top: 16,
  right: 16,
  zIndex: 60,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  color: "white",
  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
  [theme.breakpoints.up("md")]: { display: "none" }
}));

const MobileDrawer = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    width: 256,
    backgroundColor: "rgba(17, 24, 39, 0.95)",
    backdropFilter: "blur(10px)",
    border: "none"
  }
}));

const MobileNavButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "active"
})<{ active?: boolean }>(({ active }) => ({
  width: "100%",
  textAlign: "left",
  padding: "12px 16px",
  borderRadius: "8px",
  marginBottom: "8px",
  ...(active
    ? {
        backgroundColor: "white",
        color: "gray.900",
        "&:hover": { backgroundColor: "white" }
      }
    : {
        color: "rgba(255, 255, 255, 0.6)",
        "&:hover": { color: "primary.main" }
      })
}));

// -------------------------
// Hook: Active Section Detection
// -------------------------
const useActiveSection = () => {
  const [active, setActive] = useState(SECTIONS[0]);

  const handleScroll = useCallback(
    throttle(() => {
      const threshold = window.innerHeight * SCROLL_THRESHOLD_RATIO;

      for (const section of SECTIONS) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold && rect.bottom >= threshold) {
            setActive(section);
            break;
          }
        }
      }
    }, 100),
    []
  );

  useEffect(() => {
    handleScroll(); // initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return active;
};

// -------------------------
// 🚀 Main Component
// -------------------------
export const Navigation: React.FC = () => {
  const activeSection = useActiveSection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.offsetTop - SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* 🖥️ Desktop Navigation */}
      <NavigationContainer>
        <NavigationBar>
          {SECTIONS.map((id) => (
            <NavButton
              key={id}
              onClick={() => scrollToSection(id)}
              active={activeSection === id}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </NavButton>
          ))}
        </NavigationBar>
      </NavigationContainer>

      {/* 📱 Mobile Menu Button */}
      <MobileMenuButton onClick={() => setIsMobileMenuOpen((v) => !v)}>
        {isMobileMenuOpen ? <Close /> : <Menu />}
      </MobileMenuButton>

      {/* 📋 Mobile Drawer */}
      <MobileDrawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)"
          }
        }}
      >
        <Box sx={{ padding: 2, marginTop: 5 }}>
          <List>
            {SECTIONS.map((id) => (
              <ListItem key={id} disablePadding>
                <MobileNavButton
                  onClick={() => scrollToSection(id)}
                  active={activeSection === id}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </MobileNavButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </MobileDrawer>
    </>
  );
};
