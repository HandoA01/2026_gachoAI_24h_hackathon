import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showClose?: boolean;
  onClose?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showClose = true, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-[56px] w-full items-center justify-center border-b border-border-light bg-bg px-4">
      {showClose && (
        <button
          type="button"
          onClick={handleClose}
          className="absolute left-4 flex h-10 w-10 items-center justify-center"
          aria-label="Close"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#1A1A1A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <h1 className="text-[17px] font-semibold text-text-primary">{title}</h1>
    </header>
  );
};

export default Header;
