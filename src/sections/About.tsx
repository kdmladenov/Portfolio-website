import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TypographyProps
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { SectionHeader } from "../components/SectionHeader";
import technologiesList from "../constants/technologiesList";
import qualificationsList from "../constants/qualificationsList";

// ===== Types =====
type TechnologyItem = { title: string; image?: string };
type TechnologiesMap = Record<string, TechnologyItem[]>;

// ===== Styled =====
const SectionRoot = styled("section")(({ theme }) => ({
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up("lg")]: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12)
  }
}));

const GlassCard = styled(Card)(({ theme }) => ({
  position: "relative",
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(4)
  },
  [theme.breakpoints.up("lg")]: {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(5)
  },
  borderRadius: 24,
  background: "rgba(16,16,18,0.9)",
  border: "1px solid rgba(255,255,255,0.12)",
  backdropFilter: "blur(8px)"
}));

const Eyebrow = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontSize: "0.85rem",
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  background: "linear-gradient(90deg, #6ee7b7, #38bdf8)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent"
}));

// ===== Helpers =====
const orderedCategories = (map: TechnologiesMap) => {
  const preferredOrder = ["Languages", "Front-end", "Back-end", "Other"];
  const keys = Object.keys(map);
  return [
    ...preferredOrder.filter((k) => keys.includes(k)),
    ...keys.filter((k) => !preferredOrder.includes(k))
  ];
};

// ===== Component =====
export const AboutSection: React.FC = () => {
  const techMap = technologiesList as TechnologiesMap;
  const educationList = qualificationsList.education;

  return (
    <SectionRoot id="about">
      <Container maxWidth="lg">
        <SectionHeader
          title="About"
          // description="Here's a little more about me."
          eyebrow="about me"
        />

        {/* Download CV */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            component="a"
            href="/Krasimir_Mladenov_resume.pdf"
            download
            startIcon={<DownloadRoundedIcon />}
            sx={{
              height: 28,
              color: "#0A0A0A",
              fontWeight: 600,
              px: 2.5,
              backgroundColor: "#FFFFFF",
              "&:hover": { backgroundColor: "#6ee7b7" },
              borderRadius: 2
            }}
          >
            Download CV
          </Button>
        </Box>

        {/* Tech Stack */}
        <Box sx={{ mt: { xs: 6, md: 10 } }}>
          <GlassCard elevation={0}>
            <Eyebrow component="div">Tech Stack</Eyebrow>

            <Typography
              variant="h4"
              sx={{
                mt: { xs: 1.5, md: 2 },
                fontFamily: "serif",
                color: "rgba(255,255,255,0.95)"
              }}
            >
              Tools & Technologies
            </Typography>

            <Divider
              sx={{
                mt: { xs: 1.5, md: 2 },
                borderColor: "rgba(255,255,255,0.05)",
                borderWidth: 2
              }}
            />

            {/* Categories */}
            <Stack spacing={4} sx={{ mt: 2 }}>
              {orderedCategories(techMap).map((categoryKey) => {
                const items = techMap[categoryKey] ?? [];
                return (
                  <Box key={categoryKey}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}
                    >
                      {categoryKey}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      flexWrap="wrap"
                    >
                      {items.map((t) => (
                        <Chip
                          key={t.title}
                          label={t.title}
                          size="medium"
                          variant="outlined"
                          avatar={
                            t.image ? (
                              <Avatar
                                alt={t.title}
                                src={t.image}
                                sx={{ width: 40, height: 40 }}
                                slotProps={{
                                  img: { style: { objectFit: "contain" } }
                                }}
                              />
                            ) : undefined
                          }
                          sx={{
                            color: "rgba(255,255,255,0.85)",
                            borderColor: "rgba(255,255,255,0.22)",
                            backgroundColor: "rgba(255,255,255,0.04)",
                            "& .MuiChip-label": { px: 1 },
                            "&:hover": {
                              borderColor: "rgba(110,231,183,0.6)",
                              backgroundColor: "rgba(110,231,183,0.08)"
                            }
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </GlassCard>
        </Box>

        {/* Education Section */}
        <Box sx={{ mt: { xs: 6, md: 10 } }}>
          <GlassCard elevation={0}>
            <Eyebrow component="div">Education</Eyebrow>

            <Typography
              variant="h4"
              sx={{
                mt: { xs: 1.5, md: 2 },
                fontFamily: "serif",
                color: "rgba(255,255,255,0.95)"
              }}
            >
              Academic Background
            </Typography>

            <Divider
              sx={{
                mt: { xs: 1.5, md: 2 },
                borderColor: "rgba(255,255,255,0.05)",
                borderWidth: 2
              }}
            />

            <Stack spacing={4} sx={{ mt: 2 }}>
              {educationList.map((edu, idx) => (
                <Box key={`${edu.title}-${idx}`}>
                  <Typography
                    variant="h6"
                    sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}
                  >
                    {edu.title}
                  </Typography>

                  {edu.institution && (
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {edu.institution}
                    </Typography>
                  )}

                  {edu.location && edu.location.length > 0 && (
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {edu.location.join(" • ")}
                    </Typography>
                  )}

                  {edu.period && (
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {edu.period}
                    </Typography>
                  )}

                  {edu.info && edu.info.length > 0 && (
                    <List sx={{ mt: 1, py: 0 }}>
                      {edu.info.map((item, i) => (
                        <ListItem
                          key={`${item.title}-${i}`}
                          disableGutters
                          sx={{ py: 0.5, px: 0 }}
                        >
                          <ListItemIcon
                            sx={{ minWidth: 0, mr: 1.25, mt: "0.35em" }}
                          >
                            <CheckCircleRoundedIcon
                              sx={{
                                fontSize: { xs: 18, md: 20 },
                                color: "rgba(255,255,255,0.9)"
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${item.title}: ${item.text}`}
                            primaryTypographyProps={{
                              variant: "body1",
                              sx: {
                                color: "rgba(255,255,255,0.75)",
                                lineHeight: 1.6
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}

                  <Divider
                    sx={{ mt: 2, borderColor: "rgba(255,255,255,0.05)" }}
                  />
                </Box>
              ))}
            </Stack>
          </GlassCard>
        </Box>
      </Container>
    </SectionRoot>
  );
};
