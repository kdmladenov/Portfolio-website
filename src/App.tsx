import { Box } from "@mui/material";
import { Header } from "./sections/Header";
import { HeroSection } from "./sections/Hero";
import { ProjectsSection } from "./sections/Projects";
import { AboutSection } from "./sections/About";
import { Footer } from "./sections/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { ExperienceSection } from "./sections/Experience";

function App() {
  return (
    <Box>
      <Header />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <AboutSection />
      <Footer />
      <ScrollToTop />
    </Box>
  );
}

export default App;
