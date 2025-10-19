import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CheckCircleRounded as CheckIcon,
  GitHub as GitHubIcon,
  SmartDisplayRounded as VideoIcon,
  CollectionsRounded as GalleryIcon
} from "@mui/icons-material";

import projectsList from "../constants/projectsList";
import { GalleryModal } from "../components/GalleryModal";

// ===== Styled Components =====
const SectionRoot = styled("section")(({ theme }) => ({
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up("lg")]: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12)
  }
}));

const Eyebrow = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontSize: "0.8rem",
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  background: "linear-gradient(90deg, #6ee7b7, #38bdf8)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent"
}));

const StickyCard = styled(Card)(({ theme }) => ({
  position: "sticky",
  padding: theme.spacing(4),
  [theme.breakpoints.up("md")]: { padding: theme.spacing(6) },
  [theme.breakpoints.up("lg")]: { padding: theme.spacing(8) },
  borderRadius: 24,
  background: "rgba(16,16,18,0.9)",
  border: "1px solid rgba(255,255,255,0.12)",
  backdropFilter: "blur(8px)"
}));

const ImageEl = styled("img")(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "180%",
  borderRadius: 24,
  overflow: "hidden",
  transition: "transform 300ms ease",
  cursor: "pointer",
  "&:hover": { transform: "scale(1.05)" },
  [theme.breakpoints.up("lg")]: { marginTop: 0 }
}));

const PlaceholderImage = styled(Box)(({ theme }) => ({
  mt: theme.spacing(2),
  borderRadius: 12,
  height: 320,
  background:
    "linear-gradient(135deg, rgba(110,231,183,.15), rgba(56,189,248,.08))",
  border: "1px dashed rgba(255,255,255,0.2)",
  cursor: "pointer"
}));

// ===== Helper Components =====
const TechChips = ({
  technologies
}: {
  technologies: Record<string, string[]>;
}) => (
  <>
    <Divider sx={{ mt: 3, mb: 2, borderColor: "rgba(255,255,255,0.06)" }} />
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
      {Object.values(technologies)
        .flat()
        .map((tech) => (
          <Chip
            key={tech}
            label={tech}
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
);

const ProjectButtons = ({
  gh,
  videoId,
  heroImg,
  onVideoClick,
  onGalleryClick
}: {
  gh?: { link: string };
  videoId?: string;
  heroImg?: string;
  onVideoClick: (e: React.MouseEvent) => void;
  onGalleryClick: (e: React.MouseEvent) => void;
}) => {
  const buttonStyles = {
    height: 20,
    color: "#0A0A0A",
    fontWeight: 600,
    px: 2,
    backgroundColor: "#FFFFFF",
    "&:hover": { backgroundColor: "#6ee7b7" },
    borderRadius: 2
  };

  return (
    <Stack
      direction="row"
      spacing={1.5}
      useFlexGap
      flexWrap="wrap"
      sx={{ mt: 3 }}
    >
      {gh && (
        <Button
          component="a"
          href={gh.link}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<GitHubIcon />}
          sx={buttonStyles}
        >
          GitHub
        </Button>
      )}
      {videoId && (
        <Button
          onClick={onVideoClick}
          startIcon={<VideoIcon />}
          sx={buttonStyles}
        >
          Video
        </Button>
      )}
      {heroImg && (
        <Button
          onClick={onGalleryClick}
          startIcon={<GalleryIcon />}
          sx={buttonStyles}
        >
          Gallery
        </Button>
      )}
    </Stack>
  );
};

// ===== Main Component =====
export const ProjectsSection: React.FC = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handleGalleryClick = (project: any) => (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedProject(project);
    const firstImageIndex =
      project.content?.findIndex((m: any) => m.type === "image") ?? 0;
    setSelectedProjectIndex(firstImageIndex);
    setGalleryOpen(true);
  };

  const handleVideoClick = (project: any) => (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedProject(project);
    const videoSlideIndex =
      project.content?.findIndex((m: any) => m.type === "video") ?? 0;
    setSelectedProjectIndex(videoSlideIndex);
    setGalleryOpen(true);
  };

  return (
    <SectionRoot id="projects">
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center" }}>
          <Eyebrow variant="overline">Real-world Results</Eyebrow>
          <Typography
            variant="h3"
            sx={{ mt: 1, fontWeight: 700, color: "rgba(255,255,255,0.95)" }}
          >
            Personal Projects
          </Typography>
        </Box>

        {/* Projects */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: { xs: 5, md: 10 },
            gap: 10
          }}
        >
          {projectsList.map((project, projectIndex) => {
            const heroImg = project.content?.find(
              (m: any) => m.type === "image"
            )?.id;
            const videoId = (
              project.content?.find((m: any) => m.type === "video") as {
                type: "video";
                videoId: string;
                message?: string;
              }
            )?.videoId;
            const gh = project.links?.find((l: any) =>
              /github/i.test(l.description)
            );

            return (
              <StickyCard
                key={project.title}
                elevation={0}
                style={{ top: `${64 + projectIndex * 40}px` }}
              >
                <Grid container columnSpacing={{ lg: 4 }}>
                  {/* LEFT COLUMN */}
                  <Grid item xs={12} lg={6} sx={{ pb: { lg: 8 } }}>
                    <Typography
                      variant="h4"
                      sx={{
                        mt: { xs: 1.5, md: 2 },
                        fontFamily: "serif",
                        color: "rgba(255,255,255,0.95)"
                      }}
                    >
                      {project.title}
                    </Typography>

                    <Eyebrow variant="overline">
                      {project.technologies?.["Front-end"] &&
                      project.technologies?.["Back-end"]
                        ? "Full-stack Project"
                        : "Project"}
                    </Eyebrow>

                    <Divider
                      sx={{
                        mt: { xs: 1.5, md: 2 },
                        borderColor: "rgba(255,255,255,0.05)",
                        borderWidth: 2
                      }}
                    />

                    <List sx={{ mt: { xs: 1.5, md: 2 }, py: 0 }}>
                      {project.features?.map((f: any) => (
                        <ListItem key={f.title} disableGutters sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckIcon
                              sx={{
                                fontSize: { xs: 20, md: 24 },
                                color: "rgba(255,255,255,0.9)"
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              f.description
                                ? `${f.title} — ${f.description}`
                                : f.title
                            }
                            primaryTypographyProps={{
                              variant: "body1",
                              sx: { color: "rgba(255,255,255,0.7)" }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>

                    {project.technologies && (
                      <TechChips technologies={project.technologies} />
                    )}

                    <ProjectButtons
                      gh={gh}
                      videoId={videoId}
                      heroImg={heroImg}
                      onVideoClick={handleVideoClick(project)}
                      onGalleryClick={handleGalleryClick(project)}
                    />
                  </Grid>

                  {/* RIGHT COLUMN */}
                  <Grid item xs={12} lg={6}>
                    {heroImg ? (
                      <ImageEl
                        src={heroImg}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        onClick={handleGalleryClick(project)}
                      />
                    ) : (
                      <PlaceholderImage onClick={handleGalleryClick(project)} />
                    )}
                  </Grid>
                </Grid>
              </StickyCard>
            );
          })}
        </Box>
      </Container>

      {/* Gallery Modal */}
      <GalleryModal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        project={selectedProject}
        initialSlideIndex={selectedProjectIndex}
      />
    </SectionRoot>
  );
};
