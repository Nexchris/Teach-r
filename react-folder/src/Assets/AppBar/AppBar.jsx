import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../image/header-logo.png';

function MUIAppBar() {
  return (
<AppBar position="static" color='white'
sx={{
  backgroundColor: 'white',
  position: 'fixed'
}}>
      <Toolbar className="flex justify-center items-center">
        <img
          src={Logo}
          alt="Logo"
          className="cursor-pointer max-h-12" // max-h-12 pour ajuster la taille du logo
        />
      </Toolbar>
    </AppBar>
  );
}

export default MUIAppBar;


