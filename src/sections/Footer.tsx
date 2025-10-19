import React from "react";
import { Box, Typography, Link, Container, Stack } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import contactsList from "../constants/contactsList";

const footerLinks = [
  { title: "About", href: "#about" },
  { title: "Experience", href: "#experience" },
  { title: "Projects", href: "#projects" },
  { title: "Contact", href: "#contact" }
];

export const Footer: React.FC = () => {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          height: 400,
          width: 1600,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(16, 185, 129, 0.3)",
          maskImage:
            "radial-gradient(50% 50% at bottom center, black, transparent)",
          zIndex: -10
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            py: 3,
            fontSize: "0.875rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: "center",
            gap: 4
          }}
        >
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.4)",
              textAlign: { xs: "center", md: "left" }
            }}
          >
            © {new Date().getFullYear()} Krasimir Mladenov
          </Typography>

          {/* Footer navigation */}
          <Box
            component="nav"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 4
            }}
          >
            {footerLinks.map((link) => (
              <Link
                href={link.href}
                key={link.title}
                onClick={(e) => handleScroll(e, link.href)}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": {
                    color: "primary.main",
                    "& svg": { transform: "translate(2px, -2px)" }
                  },
                  "& svg": { transition: "transform 0.2s ease-in-out" }
                }}
              >
                <span>{link.title}</span>
                <KeyboardArrowRight
                  sx={{ fontSize: 16, transform: "rotate(-45deg)" }}
                />
              </Link>
            ))}
          </Box>

          {/* Contacts */}
          <Stack direction="row" spacing={3} alignItems="center">
            {contactsList.map((contact) =>
              contact.href ? (
                <Link
                  key={contact.title}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "rgba(255, 255, 255, 0.6)",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": { color: "primary.main" }
                  }}
                >
                  <i className={contact.icon} aria-hidden="true" />
                  {contact.title || contact.info}
                </Link>
              ) : (
                <Box
                  key={contact.title}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "rgba(255, 255, 255, 0.6)",
                    fontWeight: 500
                  }}
                >
                  <i className={contact.icon} aria-hidden="true" />
                  {contact.title}
                </Box>
              )
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
