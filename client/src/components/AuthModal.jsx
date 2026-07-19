import React, { useState, useEffect } from 'react';
import {
    Dialog,
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    InputAdornment,
    IconButton,
    Link,
    LinearProgress,
} from '@mui/material';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function passwordStrength(pw) {
    let score = 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    return score;
}

const STRENGTH_LABEL = ['Too short', 'Weak', 'Okay', 'Good', 'Strong'];
const STRENGTH_COLOR = ['#7A2E2E', '#7A2E2E', '#C89B3C', '#33513F', '#33513F'];

const EMPTY_VALUES = { name: '', email: '', password: '' };

/**
 * Auth dialog that shows Login or Register content, centered over a
 * dimmed backdrop. Controlled from the parent via `open` / `mode`.
 *
 * <AuthModal
 *   open={authOpen}
 *   mode={authMode}                 // 'login' | 'register'
 *   onClose={() => setAuthOpen(false)}
 *   onSwitchMode={(m) => setAuthMode(m)}
 *   onLogin={async (values) => {...}}
 *   onRegister={async (values) => {...}}
 * />
 */
export default function AuthModal({
    open,
    mode = 'login',
    onClose,
    onSwitchMode,
    onLogin,
    onRegister,
}) {
    const [values, setValues] = useState(EMPTY_VALUES);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const isLogin = mode === 'login';

    // Reset the form whenever the dialog is opened or the mode is switched.
    useEffect(() => {
        if (open) {
            setValues(EMPTY_VALUES);
            setErrors({});
            setShowPassword(false);
        }
    }, [open, mode]);

    const handleChange = (field) => (e) => {
        setValues((v) => ({ ...v, [field]: e.target.value }));
        if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
    };

    const validate = () => {
        const next = {};
        if (!isLogin && !values.name.trim()) next.name = 'Enter your name.';
        if (!values.email) next.email = 'Enter your email address.';
        else if (!isValidEmail(values.email)) next.email = "That email doesn't look right.";
        if (!values.password) next.password = isLogin ? 'Enter your password.' : 'Create a password.';
        else if (!isLogin && values.password.length < 8) next.password = 'Use at least 8 characters.';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        try {
            if (isLogin) {
                await onLogin?.({ email: values.email, password: values.password });
            } else {
                await onRegister?.(values);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const strength = !isLogin && values.password ? passwordStrength(values.password) : 0;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            slotProps={{
                backdrop: {
                    sx: { bgcolor: 'rgba(20,18,14,0.6)', backdropFilter: 'blur(2px)' },
                },
                paper: {
                    elevation: 0,
                    sx: {
                        position: 'relative',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        backgroundImage: 'none',
                        boxSizing: 'border-box',
                        width: '100%',
                        p: { xs: 3, sm: 4.5 },
                        m: { xs: 2, sm: 3 },
                    },
                },
            }}
        >
            <IconButton
                aria-label="Close"
                onClick={onClose}
                sx={{ position: 'absolute', top: 10, right: 10, color: 'text.secondary' }}
            >
                <CloseRoundedIcon fontSize="small" />
            </IconButton>

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack sx={{ "alignItems": "center" }} spacing={1} sx={{ mb: 3.5 }}>
                    <MenuBookRoundedIcon sx={{ color: 'primary.main', fontSize: 32 }} />
                    <Typography variant="h4" sx={{ fontSize: '1.5rem', color: 'text.primary' }}>
                        {isLogin ? 'Welcome back' : 'Create your account'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                        {isLogin
                            ? 'Log in to pick up right where you left off.'
                            : 'Upload your books once — read them anywhere, anytime.'}
                    </Typography>
                </Stack>

                <Stack spacing={2.25}>
                    {!isLogin && (
                        <TextField
                            label="Name"
                            fullWidth
                            autoComplete="name"
                            value={values.name}
                            onChange={handleChange('name')}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonRoundedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}

                    <TextField
                        sx={{
                            "label": "Email",
                            "type": "email",
                            "autoComplete": "email",
                        }}
                        fullWidth
                        value={values.email}
                        onChange={handleChange('email')}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailRoundedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />

                    <Box>
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            autoComplete={isLogin ? 'current-password' : 'new-password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            error={Boolean(errors.password)}
                            helperText={
                                errors.password || (!isLogin ? 'At least 8 characters.' : ' ')
                            }
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockRoundedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                onClick={() => setShowPassword((s) => !s)}
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOffRoundedIcon sx={{ fontSize: 20 }} />
                                                ) : (
                                                    <VisibilityRoundedIcon sx={{ fontSize: 20 }} />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }
                            }}
                        />
                        {!isLogin && values.password && (
                            <Box sx={{ mt: 1 }}>
                                <LinearProgress
                                    variant="determinate"
                                    value={(strength / 4) * 100}
                                    sx={{
                                        height: 4,
                                        borderRadius: 2,
                                        bgcolor: 'rgba(30,27,22,0.08)',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: STRENGTH_COLOR[strength],
                                            borderRadius: 2,
                                        },
                                    }}
                                />
                                <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
                                    {STRENGTH_LABEL[strength]}
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    {isLogin && (
                        <Box sx={{ textAlign: 'right', mt: -1.5 }}>
                            <Link href="#" underline="hover" sx={{ fontSize: '0.875rem', color: 'primary.main' }}>
                                Forgot password?
                            </Link>
                        </Box>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        disableElevation
                        disabled={submitting}
                    >
                        {submitting
                            ? isLogin
                                ? 'Logging in…'
                                : 'Creating account…'
                            : isLogin
                                ? 'Log in'
                                : 'Create account'}
                    </Button>
                </Stack>

                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mt: 3 }}>
                    {isLogin ? "New to Bookshelf? " : 'Already have an account? '}
                    <Link
                        component="button"
                        type="button"
                        onClick={() => onSwitchMode?.(isLogin ? 'register' : 'login')}
                        underline="hover"
                        sx={{ color: 'primary.main', fontWeight: 600 }}
                    >
                        {isLogin ? 'Create an account' : 'Log in'}
                    </Link>
                </Typography>
            </Box>
        </Dialog>
    );
}