
import React, { useState } from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  IconButton, 
  Button, 
  Rating, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Custom theme to match the design
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          fontWeight: 500,
          fontSize: '0.875rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

const ProductBox = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ 
        maxWidth: 300, 
        backgroundColor: 'background.paper',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        },
      }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image="../src/assets/apple-iphone-16-pro-unlocked-1tb-smartphone-with-apple-intelligence-1-removebg-preview.png"
            alt="PlayStation 5"
            sx={{ 
              backgroundColor: '#f5f5f5',
              objectFit: 'contain',
              pt: 2
            }}
          />
          <IconButton
            onClick={toggleFavorite}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
              width: 32,
              height: 32,
            }}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: '#ff4081', fontSize: 20 }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>
        </Box>
        
        <CardContent sx={{ p: 2 }}>
          <Typography gutterBottom variant="subtitle1" component="h2" fontWeight="500">
            PlayStation 5
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            The PlayStation 5 takes gaming to the next level
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
            <Typography variant="body2" color="text.secondary" mr={0.5}>
              4.5
            </Typography>
            <Rating 
              value={4.5} 
              precision={0.5} 
              size="small" 
              readOnly 
            />
            <Typography variant="body2" color="text.secondary" ml={0.5}>
              (421)
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              $499.99
            </Typography>
            <Button 
              variant="outlined" 
              size="small"
              sx={{ 
                minWidth: 80,
                fontSize: '0.75rem',
                px: 2,
                borderRadius: '35px',
                border: '1px solid #f76209',
                color: '#f76209'
              }}
            >
              Buy now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default ProductBox;