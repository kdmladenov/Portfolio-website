import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { Close, NavigateBefore, NavigateNext, ZoomIn, ZoomOut } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

// Types matching the existing data structure
type ProjectImage = { id: string; type: "image"; message?: string }
type ProjectVideo = { videoId: string; type: "video"; message?: string }
type ProjectMedia = ProjectImage | ProjectVideo

type OldProject = {
  title: string
  content?: ProjectMedia[]
}

interface GalleryModalProps {
  open: boolean
  onClose: () => void
  project: OldProject | null
  initialSlideIndex?: number
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    color: 'white',
    maxWidth: '95vw',
    maxHeight: '95vh',
    margin: theme.spacing(1),
    borderRadius: theme.spacing(2),
  },
}))

const MediaContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "95vw",
  height: "95vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  borderRadius: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    height: "60vh"
  }
}));

const MediaImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
  transition: 'transform 0.3s ease-in-out',
  borderRadius: theme.spacing(1),
}))

const MediaVideo = styled('iframe')(({ theme }) => ({
  width: '100%',
  height: '100%',
  border: 'none',
  borderRadius: theme.spacing(1),
}))

const ControlButton = styled(IconButton)(({ theme: _theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: 'white',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transform: 'translateY(-50%) scale(1.1)',
  },
  zIndex: 10,
}))

const ZoomControls = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(7),
  right: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(8px)',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1),
  border: '1px solid rgba(255, 255, 255, 0.2)',
}))

const MessageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  padding: theme.spacing(2),
  textAlign: 'center',
}))

export const GalleryModal: React.FC<GalleryModalProps> = ({
  open,
  onClose,
  project,
  initialSlideIndex = 0,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlideIndex)
  const [zoom, setZoom] = useState(1)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const content = project?.content || []
  const currentMedia = content[currentSlideIndex]

  useEffect(() => {
    if (open && project) {
      setCurrentSlideIndex(initialSlideIndex)
      setZoom(1)
    }
  }, [open, initialSlideIndex, project])

  const handlePrevious = () => {
    setCurrentSlideIndex(prev => (prev > 0 ? prev - 1 : content.length - 1))
    setZoom(1)
  }

  const handleNext = () => {
    setCurrentSlideIndex(prev => (prev < content.length - 1 ? prev + 1 : 0))
    setZoom(1)
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5))
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!open) return

    switch (event.key) {
      case 'ArrowLeft':
        handlePrevious()
        break
      case 'ArrowRight':
        handleNext()
        break
      case 'Escape':
        onClose()
        break
      case '+':
      case '=':
        handleZoomIn()
        break
      case '-':
        handleZoomOut()
        break
    }
  }

  if (!project || content.length === 0) {
    return null
  }

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <DialogContent
        sx={{
          p: 0,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {project.title} Gallery
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Media Container */}
        <MediaContainer>
          {currentMedia?.type === 'image' ? (
            <MediaImage
              src={currentMedia.id}
              alt={`${project.title} - Slide ${currentSlideIndex + 1}`}
              style={{
                transform: `scale(${zoom})`,
              }}
            />
          ) : currentMedia?.type === 'video' ? (
            <MediaVideo
              src={`https://www.youtube.com/embed/${currentMedia.videoId}?rel=0&enablejsapi=1&controls=1&autoplay=0`}
              title={currentMedia.message || `${project.title} Video`}
              allowFullScreen
            />
          ) : (
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              No media available
            </Typography>
          )}

          {/* Navigation Controls */}
          {content.length > 1 && (
            <>
              <ControlButton
                onClick={handlePrevious}
                sx={{ left: 16 }}
                size="large"
              >
                <NavigateBefore />
              </ControlButton>
              <ControlButton
                onClick={handleNext}
                sx={{ right: 16 }}
                size="large"
              >
                <NavigateNext />
              </ControlButton>
            </>
          )}

          {/* Zoom Controls (only for images) */}
          {currentMedia?.type === 'image' && (
            <ZoomControls direction="row" spacing={1}>
              <IconButton
                onClick={handleZoomOut}
                size="small"
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <ZoomOut />
              </IconButton>
              <IconButton
                onClick={handleZoomIn}
                size="small"
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <ZoomIn />
              </IconButton>
            </ZoomControls>
          )}

          {/* Message Overlay */}
          {currentMedia?.message && (
            <MessageOverlay>
              <Typography variant="body2" sx={{ color: 'white' }}>
                {currentMedia.message}
              </Typography>
            </MessageOverlay>
          )}
        </MediaContainer>

        {/* Footer with slide indicator */}
        {content.length > 1 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {currentSlideIndex + 1} of {content.length}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ ml: 2 }}>
              {content.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentSlideIndex(index)}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: index === currentSlideIndex 
                      ? 'white' 
                      : 'rgba(255, 255, 255, 0.3)',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                      backgroundColor: index === currentSlideIndex 
                        ? 'white' 
                        : 'rgba(255, 255, 255, 0.6)',
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}
      </DialogContent>
    </StyledDialog>
  )
}
