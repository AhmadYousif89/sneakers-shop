import { useEffect, useRef, useState } from 'react';

type EventType = 'click' | 'touch' | 'mouseover';

type Callback = (event: Event) => void;

type Options = {
  eventType?: EventType;
  insideElement?: Callback;
  outsideElement?: Callback;
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
      const el = ref.current;
      if (el && el.contains(e.target as Node)) {
        setIsInside(pv => !pv);
        if (insideElement) insideElement(e);
      } else {
        setIsInside(false);
        if (outsideElement) outsideElement(e);
      }
    };

    document.addEventListener(eventType, eventHandler);
    return () => document.removeEventListener(eventType, eventHandler);
  }, [eventType, insideElement, outsideElement]);

  return { ref, isInside };
};
