import React from "react";
import {
  Box,
  Card,
  Chip,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  TypographyProps
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { SectionHeader } from "../components/SectionHeader";
import qualificationsList from "../constants/qualificationsList";

// ===== Types for the UI layer =====
type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  achievements?: string[];
  technologies?: string[];
};

// ===== Styled (dark glass, sticky like Projects) =====
const SectionRoot = styled("section")(({ theme }) => ({
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up("lg")]: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12)
  }
}));

const StickyCard = styled(Card)(({ theme }) => ({
  position: "sticky",
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

const Eyebrow = styled(Typography)<TypographyProps>(() => ({
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontSize: "0.85rem",
  display: "block",
  background: "linear-gradient(90deg, #6ee7b7, #38bdf8)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent"
}));

const EyebrowSub = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontSize: "0.85rem",
  color: "rgba(255,255,255,0.7)",
  display: "block",
  marginTop: theme.spacing(0.5)
}));

const getExperienceDuration = (period: string): string => {
  // Split start and end
  let [startStr, endStr] = period.split("–").map((s) => s.trim());

  // Handle "Present"
  const endDate = endStr.toLowerCase().includes("present")
    ? new Date()
    : new Date(endStr);

  const startDate = new Date(startStr);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return ""; // fallback if parsing fails
  }

  // Calculate difference in months and round up 1 month
  let monthsDiff =
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear());

  monthsDiff += 1; // round up 1 month

  const years = Math.floor(monthsDiff / 12);
  const months = monthsDiff % 12;

  const yearsStr = years ? `${years} yr${years > 1 ? "s" : ""}` : "";
  const monthsStr = months ? `${months} mo${months > 1 ? "s" : ""}` : "";

  return [yearsStr, monthsStr].filter(Boolean).join(" ");
};

const toExperienceItems = (): ExperienceItem[] => {
  const list = qualificationsList?.experience ?? [];
  return list.map((e: any) => {
    const role = String(e.title ?? "")
      .replace(/\s*-\s*/g, " — ")
      .trim();
    const company = String(e.institution ?? "").trim();
    const location = Array.isArray(e.location)
      ? e.location.filter(Boolean).join(" • ")
      : undefined;

    const achievements = Array.isArray(e.info)
      ? e.info.map((i: any) =>
          typeof i === "string"
            ? i
            : [i?.title, i?.text].filter(Boolean).join(" — ")
        )
      : [];

    const technologies = Array.isArray(e.technologies)
      ? e.technologies.map((t: string) => t.trim()).filter(Boolean)
      : [];

    return {
      company,
      role,
      period: e.period ?? "",
      location,
      achievements,
      technologies
    };
  });
};

export const ExperienceSection: React.FC = () => {
  const items = toExperienceItems();

  return (
    <SectionRoot id="experience">
      <Container maxWidth="lg">
        <SectionHeader
          title="Experience"
          // description="My professional journey and expertise in front-end development."
          eyebrow="Work Experience"
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: { xs: 5, md: 10 },
            gap: 10
          }}
        >
          {items.map((exp, idx) => (
            <StickyCard
              key={`${exp.company}-${exp.role}-${idx}`}
              elevation={0}
              style={{ top: `${64 + idx * 40}px` }}
            >
              <Box>
                {/* Role */}
                <Typography
                  variant="h4"
                  sx={{
                    mt: { xs: 1.5, md: 2 },
                    fontFamily: "serif",
                    color: "rgba(255,255,255,0.95)"
                  }}
                >
                  {exp.role}
                </Typography>

                {/* Period */}
                <Typography
                  variant="body2"
                  sx={{ mt: 0.75, color: "rgba(255,255,255,0.6)" }}
                >
                  {exp.period} ({getExperienceDuration(exp.period)})
                </Typography>

                <Eyebrow component="div">{exp.company}</Eyebrow>

                {exp.location && (
                  <EyebrowSub component="div">{exp.location}</EyebrowSub>
                )}

                {/* Divider */}
                <Divider
                  sx={{
                    mt: { xs: 1.5, md: 2 },
                    borderColor: "rgba(255,255,255,0.05)",
                    borderWidth: 2
                  }}
                />

                {/* Achievements (wide list, aligned checks) */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <List sx={{ mt: { xs: 1.5, md: 2 }, py: 0 }}>
                    {exp.achievements.map((line, i) => (
                      <ListItem
                        key={`${line}-${i}`}
                        disableGutters
                        alignItems="flex-start"
                        sx={{ py: 0.5, px: 0 }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: 1.25,
                            mt: "0.35em"
                          }}
                        >
                          <CheckCircleRoundedIcon
                            sx={{
                              fontSize: { xs: 18, md: 20 },
                              color: "rgba(255,255,255,0.9)"
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={line}
                          sx={{ m: 0 }}
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

                {/* Tech Chips */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <>
                    <Divider
                      sx={{
                        mt: 3,
                        mb: 1,
                        borderColor: "rgba(255,255,255,0.06)"
                      }}
                    />
                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      flexWrap="wrap"
                      sx={{ mt: 1 }}
                    >
                      {exp.technologies.map((t) => (
                        <Chip
                          key={t}
                          label={t}
                          size="small"
                          variant="outlined"
                          sx={{
                            color: "rgba(255,255,255,0.85)",
                            borderColor: "rgba(255,255,255,0.22)",
                            backgroundColor: "rgba(255,255,255,0.04)",
                            "&:hover": {
                              borderColor: "rgba(110,231,183,0.6)",
                              backgroundColor: "rgba(110,231,183,0.08)"
                            }
                          }}
                        />
                      ))}
                    </Stack>
                  </>
                )}
              </Box>
            </StickyCard>
          ))}
        </Box>
      </Container>
    </SectionRoot>
  );
};
