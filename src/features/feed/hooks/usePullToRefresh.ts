import { type TouchEvent, useCallback, useRef } from 'react';
import { isRefreshPull } from '../domain/isRefreshPull';

export function usePullToRefresh(onRefresh: () => void) {
  const pullStartY = useRef<number | undefined>(undefined);

  const onTouchStart = useCallback((event: TouchEvent) => {
    pullStartY.current = window.scrollY === 0 ? event.touches[0]?.clientY : undefined;
  }, []);

  const onTouchEnd = useCallback(
    (event: TouchEvent) => {
      const startY = pullStartY.current;
      const endY = event.changedTouches[0]?.clientY;
      pullStartY.current = undefined;
      if (startY === undefined || endY === undefined) return;
      if (isRefreshPull(endY - startY)) onRefresh();
    },
    [onRefresh],
  );

  return { onTouchStart, onTouchEnd };
}
