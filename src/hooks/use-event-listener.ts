import { useEffect, useRef, useState } from 'react';

type EventType = 'click' | 'touch' | 'mouseover';

type Options = {
  id: string;
  eventType?: EventType;
  insideElement?: () => void;
  outsideElement?: () => void;
};

export const useEventListener = <E extends HTMLElement>({
  id,
  eventType = 'click',
  insideElement,
  outsideElement,
}: Options) => {
  const ref = useRef<E>(null);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    if (!id) return;
    const el = ref.current;
    if (el) el.id = id;
  }, [id]);

  useEffect(() => {
    const eventHandler = (e: Event) => {
      const el = ref.current;
      const target = e.target as HTMLElement;
      if (el && el.contains(target) && target.id === id) {
        setIsInside(true);
        if (insideElement) insideElement();
      } else if (target.id !== id) {
        setIsInside(false);
        if (outsideElement) outsideElement();
      }
    };

    document.addEventListener(eventType, eventHandler);
    return () => document.removeEventListener(eventType, eventHandler);
  }, [eventType, insideElement, outsideElement, id]);

  return { ref, isInside };
};
