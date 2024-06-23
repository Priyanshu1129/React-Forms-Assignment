import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  // Function to get the current level name based on the route
  const getCurrentLevelName = () => {
    switch (location.pathname) {
      case '/Level1':
        return 'Level 1';
      case '/level2':
        return 'Level 2';
      case '/level3':
        return 'Level 3';
      default:
        return 'Event Registration';
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {getCurrentLevelName()}
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/Level1">
            Level 1
          </Button>
          <Button color="inherit" component={Link} to="/level2">
            Level 2
          </Button>
          <Button color="inherit" component={Link} to="/level3">
            Level 3
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;