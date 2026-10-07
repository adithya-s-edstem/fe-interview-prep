import { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

export function useBackToTop() {
  const { ref: topRef, inView: isTopInView } = useInView({ initialInView: true });
  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);
  return { topRef, isBackToTopVisible: !isTopInView, scrollToTop };
}
