import { useEffect } from 'react';
import faviconImage from '../../imports/DCP_logo-1.png';

export function Favicon() {
  useEffect(() => {
    // Update favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.setAttribute('type', 'image/png');
    link.setAttribute('rel', 'icon');
    link.setAttribute('href', faviconImage);
    document.head.appendChild(link);

    // Update title
    document.title = 'DCP - Diksha Consulting and Projects Pvt. Ltd.';
  }, []);

  return null;
}
