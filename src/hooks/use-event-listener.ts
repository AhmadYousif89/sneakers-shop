import { useEffect, useRef, useState } from 'react';

type EventType = 'click' | 'pointerdown';
type Options = {
  eventType?: EventType;
  insideElement?: (e: Event) => void;
  outsideElement?: (e: Event) => void;
};

export const useEventListener = <E extends HTMLElement>({
  eventType = 'click',
  insideElement,
  outsideElement,
}: Options) => {
  const ref = useRef<E>(null);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const eventHandler = (e: Event) => {
      const target = e.target as E;
      const el = ref.current;
      if (el && el.contains(target)) {
        setIsInside(pv => !pv);
        if (insideElement) insideElement(e);
      } else {
        setIsInside(false);
        if (outsideElement) outsideElement(e);
      }
    };

    document.addEventListener(eventType, eventHandler);
    return () => document.removeEventListener(eventType, eventHandler);
  }, [eventType]);

  return { ref, isInside };
};
