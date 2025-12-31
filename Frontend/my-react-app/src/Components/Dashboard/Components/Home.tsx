import { Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Contexts/UserContext';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const DashboardHome = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <Box
      sx={{
        // minHeight: '100vh',
        background: 'linear-gradient(135deg, #0C5A96 0%, #1a6b5a 50%, #0C5A96 100%)',
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(180deg)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.03)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            color: '#fff',
            py: { xs: 8, md: 12 },
          }}
        >
          {/* Welcome Message */}
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '4rem' },
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              animation: 'fadeInUp 0.8s ease-out',
              '@keyframes fadeInUp': {
                from: {
                  opacity: 0,
                  transform: 'translateY(30px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            Welcome{user?.name ? `, ${user.name}` : ''}!
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 300,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              mb: 6,
              opacity: 0.95,
              animation: 'fadeInUp 0.8s ease-out 0.2s both',
            }}
          >
            Discover Amazing Products at Your Fingertips
          </Typography>

          {/* CTA Button */}
          <Box
            sx={{
              animation: 'fadeInUp 0.8s ease-out 0.4s both',
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/shopping')}
              sx={{
                backgroundColor: '#fff',
                color: '#0C5A96',
                fontSize: { xs: '1rem', md: '1.25rem' },
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                borderRadius: '50px',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                },
                '&:active': {
                  transform: 'translateY(-2px)',
                },
              }}
              startIcon={<ShoppingBagIcon sx={{ fontSize: '1.5rem' }} />}
              endIcon={<ArrowForwardIcon sx={{ fontSize: '1.5rem' }} />}
            >
              Start Shopping
            </Button>
          </Box>

          {/* Feature Cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 4,
              mt: { xs: 8, md: 12 },
              animation: 'fadeInUp 0.8s ease-out 0.6s both',
            }}
          >
            {[
              {
                title: 'Wide Selection',
                description: 'Browse through thousands of products',
                icon: '🛍️',
              },
              {
                title: 'Fast Delivery',
                description: 'Get your orders delivered quickly',
                icon: '🚀',
              },
              {
                title: 'Secure Payment',
                description: 'Shop with confidence and security',
                icon: '🔒',
              },
            ].map((feature, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  p: 3,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '3rem',
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.9,
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardHome;

