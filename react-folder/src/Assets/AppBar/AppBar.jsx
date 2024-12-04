import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../image/header-logo.png';
import { useNavigate } from 'react-router-dom';


function MUIAppBar() {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      color="white"
      onClick={() => navigate('/')}
      sx={{
        backgroundColor: 'white',
        position: 'fixed',
        zIndex: 1300,
      }}
    >
      <Toolbar className="flex justify-center items-center">
        <img
          src={Logo}
          alt="Logo"
          className="cursor-pointer max-h-12" 
        />
      </Toolbar>
    </AppBar>
  );
}

export default MUIAppBar;
