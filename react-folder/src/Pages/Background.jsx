import Background from '../Assets/image/bg-geometric.jpg';
import { Box, Typography } from '@mui/material';

function BackgroundComponent() {
  return (
    <>
      <Box
        sx={{
          height: '100vh', // Hauteur de l'écran
          width: '100vw',  // Largeur de l'écran
          zIndex: '-999',
          backgroundImage: `url(${Background})`, // Définir l'image de fond
          backgroundSize: 'cover', // Couvrir toute la zone
          backgroundPosition: 'center', // Centrer l'image
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute', // Pour pouvoir placer d'autres éléments par-dessus
        }}
      > 
      </Box>

      {/* Wrapper des vagues */}
      <div className="waveWrapper waveAnimation">
        <div className="waveWrapperInner bgTop">
          <div
            className="wave waveTop"
            style={{
              backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-top.png')",
            }}
          ></div>
        </div>
        <div className="waveWrapperInner bgMiddle">
          <div
            className="wave waveMiddle"
            style={{
              backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-mid.png')",
            }}
          ></div>
        </div>
        <div className="waveWrapperInner bgBottom">
          <div
            className="wave waveBottom"
            style={{
              backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-bot.png')",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default BackgroundComponent;
