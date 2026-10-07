import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const NEAR_BOTTOM_MARGIN = '400px';

type LoadWhenNearBottomOptions = {
  loadedCount: number;
  loadNextPage: () => void;
};

export function useLoadWhenNearBottom({ loadedCount, loadNextPage }: LoadWhenNearBottomOptions) {
  const { ref: bottomRef, inView: isNearBottom } = useInView({ rootMargin: NEAR_BOTTOM_MARGIN });

  useEffect(() => {
    if (isNearBottom) loadNextPage();
  }, [isNearBottom, loadNextPage, loadedCount]);

  return bottomRef;
}
