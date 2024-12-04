import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material';
import Logo from '../image/header-logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#004066] text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col items-center sm:items-start">
            <img src={Logo} alt="Logo Teach'r" className="h-20 mb-4" />
            <p className="text-sm text-center sm:text-left">Tous vos cours particuliers dans une seule application</p>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-3">
            <Link to="https://teachr.fr/who-are-we" className="text-sm hover:underline">Qui sommes-nous ?</Link>
            <Link to="https://teachr.fr/faq" className="text-sm hover:underline">FAQ</Link>
            <Link to="https://teachr.fr/legal" className="text-sm hover:underline">Mentions Légales</Link>
            <Link to="https://teachr.fr/cgu_cgv" className="text-sm hover:underline">CGU - CGV</Link>
            <Link to="https://teachr.fr/policy" className="text-sm hover:underline">Politique de Confidentialité</Link>
          </div>

          <div className="flex justify-center sm:justify-start space-x-6">
            <a href="https://www.facebook.com/TeachrOfficial" className="text-white hover:text-blue-600">
              <Facebook fontSize="large" />
            </a>
            <a href="https://www.instagram.com/teachrofficial/?hl=fr" className="text-white hover:text-blue-600">
              <Instagram fontSize="large" />
            </a>
            <a href="https://fr.linkedin.com/company/teach-r" className="text-white hover:text-blue-600">
              <LinkedIn fontSize="large" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Teach'r. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
