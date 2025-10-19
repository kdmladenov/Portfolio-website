import React from "react";
import { Box, Typography, SxProps, Theme } from "@mui/material";

interface SectionHeaderProps {
  title: string;
  description?: string;
  eyebrow: string;
  sx?: SxProps<Theme>;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  eyebrow,
  sx
}) => (
  <Box sx={{ textAlign: "center", ...sx }}>
    {/* Eyebrow / Subtitle */}
    <Typography
      sx={{
        textTransform: "uppercase",
        fontSize: "0.875rem",
        letterSpacing: "0.1em",
        background: "linear-gradient(to right, #10b981, #0ea5e9)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block"
      }}
    >
      {eyebrow}
    </Typography>
    {/* Title */}
    <Typography
      variant="h2"
      sx={{
        mt: 3,
        fontSize: { xs: "1.875rem", md: "3rem" }
      }}
    >
      {title}
    </Typography>
    {/* Description */}
    {description && (
      <Typography
        sx={{
          color: "text.secondary",
          mt: 2,
          mx: "auto",
          maxWidth: "28rem",
          fontSize: { xs: "1rem", md: "1.125rem", lg: "1.25rem" }
        }}
      >
        {description}
      </Typography>
    )}
  </Box>
);
