import { useEffect, useRef, useState } from 'react';

type EventType = 'click' | 'mouseover';

type Options<E> = {
  id?: string;
  eventType?: EventType;
  insideElement?: (e: Event) => void;
  outsideElement?: (e: Event) => void;
};

export const useEventListener = <E extends HTMLElement>({
  id = '',
  eventType = 'click',
  insideElement,
  outsideElement,
}: Options<E>) => {
  const ref = useRef<E>(null);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el) el.id = id;
  }, [id]);

  useEffect(() => {
    const eventHandler = (e: Event) => {
      const el = ref.current;
      const target = e.target as E;
      if (el && el.contains(target) && target.id === id) {
        setIsInside(pv => !pv);
        if (insideElement) insideElement(e);
      } else if (target.id !== id) {
        setIsInside(false);
        if (outsideElement) outsideElement(e);
      }
    };

    document.addEventListener(eventType, eventHandler);
    return () => document.removeEventListener(eventType, eventHandler);
  }, [eventType, insideElement, outsideElement, id]);

  return { ref, isInside };
};
