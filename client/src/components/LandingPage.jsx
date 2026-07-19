import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  Fade,
  Grow,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import theme from './theme';
import AuthModal from './AuthModal';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';

// ---------------------------------------------------------------------------
// Signature element: an animated bookshelf built from simple divs. Each
// "spine" slides up into place with a staggered delay, as if the shelf is
// being filled book by book — a literal echo of "upload your books".
// ---------------------------------------------------------------------------
const SPINES = [
  { h: 210, color: '#2B3A55', w: 34 },
  { h: 260, color: '#C89B3C', w: 28 },
  { h: 190, color: '#7A2E2E', w: 38 },
  { h: 240, color: '#33513F', w: 26 },
  { h: 225, color: '#2B3A55', w: 32 },
  { h: 200, color: '#8C7A54', w: 30 },
  { h: 250, color: '#7A2E2E', w: 24 },
  { h: 215, color: '#33513F', w: 36 },
  { h: 235, color: '#C89B3C', w: 28 },
];

function Bookshelf() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 480,
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: { xs: '6px', sm: '10px' },
          height: 280,
          px: 2,
        }}
      >
        {SPINES.map((s, i) => (
          <Box
            key={i}
            sx={{
              width: s.w,
              height: s.h,
              bgcolor: s.color,
              borderRadius: '3px 3px 0 0',
              boxShadow: '0 6px 14px rgba(30,27,22,0.18)',
              transformOrigin: 'bottom center',
              animation: `riseIn 0.6s cubic-bezier(.2,.8,.2,1) both`,
              animationDelay: `${0.15 + i * 0.08}s`,
              transition: 'transform 0.25s ease',
              position: 'relative',
              '&:hover': {
                transform: 'translateY(-10px)',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 14,
                left: '20%',
                right: '20%',
                height: 3,
                bgcolor: 'rgba(247,242,231,0.55)',
              },
              '@keyframes riseIn': {
                from: { transform: 'translateY(40px) scaleY(0.7)', opacity: 0 },
                to: { transform: 'translateY(0) scaleY(1)', opacity: 1 },
              },
            }}
          />
        ))}
      </Box>
      {/* shelf plank */}
      <Box
        sx={{
          height: 14,
          bgcolor: '#1B2740',
          borderRadius: 1,
          boxShadow: '0 10px 20px rgba(27,39,64,0.35)',
        }}
      />
    </Box>
  );
}

const FEATURES = [
  {
    icon: CloudUploadRoundedIcon,
    title: 'Upload in seconds',
    body: 'Drop in PDFs, EPUBs, or scanned pages. Your library builds itself while you keep reading.',
  },
  {
    icon: CollectionsBookmarkRoundedIcon,
    title: 'One shelf, everything on it',
    body: 'Every title you own lives in a single, searchable shelf — sorted by author, series, or the moment you last opened it.',
  },
  {
    icon: DevicesRoundedIcon,
    title: 'Pick up anywhere',
    body: 'Start a chapter on your laptop, finish it on your phone. Your place is always saved.',
  },
];

export default function LandingPage() {
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const navigate = useNavigate();
  const BASE_URL = `${import.meta.env.VITE_API_URL}`;

  const openAuth = async (mode, user) => {
    if (user === "guest") {
      const res = await axios.post(`${BASE_URL}/api/user/guest-user`);
      sessionStorage.setItem("token", res.data.token)
      navigate('/books')
    }
    setAuthMode(mode);
    setAuthOpen(true);
  };

  useEffect(() => {
    const fetchVisits = async () => {
      const lastVisit = localStorage.getItem("lastVisit");

      const now = Date.now();

      // 1 hour = 60 * 60 * 1000 ms
      const oneHour = 60 * 60 * 1000;

      if (!lastVisit || now - Number(lastVisit) > oneHour) {
        const res = await axios.post(`${BASE_URL}/api/visit`);

        localStorage.setItem("lastVisit", now);
        localStorage.setItem("visitCount", res.data.visits);
      }
    }

    fetchVisits();

  }, []);

  useEffect(() => {
    const fetchVisits = async () => {
      const res = await axios.get(`${BASE_URL}/api/visit/total-visits`);
      localStorage.setItem("visitCount", res.data.visits);
    };

    fetchVisits();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* Load fonts — move these <link> tags into your document <head> in production */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap"
        rel="stylesheet"
      />

      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>

        {/* Header */}

        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: 'rgba(247,242,231,0.85)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ py: 1, justifyContent: 'space-between' }}>
              <Stack sx={{ "direction": "row", "alignItems": "center" }} spacing={1}>
                <MenuBookRoundedIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                <Typography
                  variant="h6"
                  sx={{ color: 'text.primary', fontSize: '1.15rem' }}
                >
                  Bookshelf
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="text"
                  color="inherit"
                  sx={{ color: 'text.primary' }}
                  onClick={() => openAuth('login')}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={() => openAuth('register')}
                >
                  Register
                </Button>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Hero */}

        <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 6, md: 8 } }}>
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Fade in timeout={700}>
                <Box>
                  <Typography
                    variant="overline"
                    sx={{ color: 'secondary.dark', display: 'block', mb: 2 }}
                  >
                    Your library, always open
                  </Typography>

                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.4rem', sm: '3rem', md: '3.4rem' },
                      lineHeight: 1.08,
                      color: 'text.primary',
                      mb: 3,
                    }}
                  >
                    Every book you own,
                    <br />
                    shelved in one place.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '1.1rem',
                      maxWidth: 480,
                      mb: 4,
                    }}
                  >
                    Bookshelf keeps every title you own organized, searchable,
                    and ready to read — on whatever device you pick up next.
                  </Typography>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 5 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disableElevation
                      fullWidth={isSmall}
                      onClick={() => openAuth('login', "guest")}
                    >
                      Continue as Guest
                    </Button>
                    {/* <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      fullWidth={isSmall}
                      sx={{ borderColor: 'primary.main' }}
                      onClick={() => openAuth('login')}
                    >
                      Login
                    </Button> */}
                  </Stack>

                  {/* Encouraging quote */}
                  <Box
                    sx={{
                      borderLeft: '3px solid',
                      borderColor: 'secondary.main',
                      pl: 2.5,
                      py: 0.5,
                      maxWidth: 440,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Fraunces", serif',
                        fontStyle: 'italic',
                        color: 'text.primary',
                        fontSize: '1.05rem',
                      }}
                    >
                      "A book unshelved is a book forgotten. Upload yours
                      today, and future-you will thank you for it."
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: 'center' }}>
              <Grow in timeout={900}>
                <Box>
                  <Bookshelf />
                </Box>
              </Grow>
            </Grid>
          </Grid>
        </Container>


        {/* Features */}

        <Box sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
          <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
            <Typography
              variant="overline"
              sx={{ color: 'secondary.dark', display: 'block', textAlign: 'center', mb: 1.5 }}
            >
              Why bookshelf
            </Typography>
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                color: 'text.primary',
                mb: { xs: 5, md: 7 },
              }}
            >
              Built for people who actually finish their books
            </Typography>

            <Grid container spacing={4}>
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Grid size={{ xs: 12, sm: 12, md: 4 }} key={f.title}>
                    <Grow in timeout={600 + i * 200}>
                      <Card
                        elevation={0}
                        sx={{
                          height: '100%',
                          border: '1px solid',
                          borderColor: 'divider',
                          bgcolor: 'background.default',
                          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                          '&:hover': {
                            transform: 'translateY(-6px)',
                            boxShadow: '0 14px 28px rgba(30,27,22,0.12)',
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3.5 }}>
                          <Box
                            sx={{
                              width: 46,
                              height: 46,
                              borderRadius: '50%',
                              bgcolor: 'primary.main',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 2.5,
                            }}
                          >
                            <Icon sx={{ color: 'background.default', fontSize: 24 }} />
                          </Box>
                          <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
                            {f.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {f.body}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grow>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        {/* Closing CTA */}

        <Container maxWidth="md" sx={{ py: { xs: 7, md: 10 }, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.7rem', md: '2.1rem' },
              color: 'text.primary',
              mb: 2,
            }}
          >
            Stop losing track of what you own.
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 520, mx: 'auto' }}>
            Make an account, upload your books, and read them whenever you're
            ready — your shelf will be waiting.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disableElevation
            onClick={() => openAuth('register')}
          >
            Get started — it's free
          </Button>
        </Container>

        {/* Footer */}

        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', py: 3 }}>
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                © {new Date().getFullYear()} Bookshelf. Your books, always within reach.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ "alignItems": "center" }} >
                <MenuBookRoundedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Bookshelf
                </Typography>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Box>

      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitchMode={setAuthMode}
        onLogin={async (values) => {
          try {
            const res = await axios.post(`${BASE_URL}/api/user/`, values)

            if (res.status === 200) {
              sessionStorage.setItem("token", res.data.token)
              setAuthOpen(false);
              navigate('/books')
            }
          } catch (error) {
            console.log(error.message)
          }
        }}
        onRegister={async (values) => {
          try {
            const res = await axios.post(`${BASE_URL}/api//`, values)

            if (res.status === 200) {
              sessionStorage.setItem("token", res.data.token)
              setAuthOpen(false);
              navigate('/books')
            }
          } catch (error) {
            console.log(error.message)
          }
        }}
      />
    </ThemeProvider>
  );
}