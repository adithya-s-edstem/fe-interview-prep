import { useContext, useEffect, useRef } from 'react';
import { focusRequestContext } from './focusRequestContext';

export function useFocusTarget<Target extends HTMLElement>(targetKey: string) {
  const targetRef = useRef<Target>(null);
  const { latestRequest } = useContext(focusRequestContext);

  useEffect(() => {
    if (latestRequest?.targetKey === targetKey) {
      targetRef.current?.focus();
    }
  }, [latestRequest, targetKey]);

  return targetRef;
}
