// ShareModal.js
import React, { useRef, useEffect } from 'react';
import facebookIcon from "../Images/facebook.svg"
import whatsappIcon from "../Images/whatsapp.svg"
import copyIcon from "../Images/Copy.svg"
const ShareModal = ({ isOpen, onRequestClose, url }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onRequestClose();
      }
    };

    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
      document.body.style.overflow = 'auto';
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      disableScroll();
    } else {
      enableScroll();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      enableScroll();
    };
  }, [isOpen, onRequestClose]);
  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    // alert('Link copied to clipboard!');
    onRequestClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal} ref={modalRef}>
        <h2 style={{ paddingBottom:"14px" }}>Share this content</h2>
        <div style={styles.shareOptions}>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            <img src={whatsappIcon} alt="WhatsApp" style={styles.icon} /> WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            <img src={facebookIcon} alt="Facebook" style={styles.icon} /> Facebook
          </a>
          <button onClick={handleCopyLink} style={styles.button}>
            <img src={copyIcon} alt="Copy" style={styles.icon} /> Copy Link
          </button>
        </div>
        <button onClick={onRequestClose} style={styles.closeButton}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
  },
  shareOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #007bff',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ccc',
    cursor: 'pointer',
  },
};

export default ShareModal;
