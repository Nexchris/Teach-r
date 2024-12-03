import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../image/header-logo.png';

function MUIAppBar() {
  const handleReload = () => {
    window.location.reload();  // Recharge la page
  };  
  return (
    <AppBar
      position="static"
      color="white"
      onClick={handleReload}
      sx={{
        backgroundColor: 'white',
        position: 'fixed', // Pour que l'AppBar reste fixe
        zIndex: 1300, // Augmenter le z-index pour donner la priorité
      }}
    >
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
