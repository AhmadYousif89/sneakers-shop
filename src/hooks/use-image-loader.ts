import { useState, useEffect, useRef } from 'react';

export const useImageLoader = (image: string | string[]) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imageEl = imageRef.current;
    if (imageEl?.complete) {
      setIsLoading(false);
      return;
    }

    if (typeof image === 'string') {
      const img = new Image();
      img.src = image;
      img.onload = () => setIsLoading(false);
    } else {
      image.map(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoading(false);
      });
    }
  }, [image, imageRef]);

  return { isLoading, imageRef };
};
