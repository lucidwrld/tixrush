import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  const initialRender = useRef(true);

  useEffect(() => {
    if (!initialRender.current) {
      window.scrollTo(0, 0);
    } else {
      initialRender.current = false;
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
