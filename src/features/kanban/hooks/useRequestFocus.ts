import { useContext } from 'react';
import { focusRequestContext } from './focusRequestContext';

export function useRequestFocus() {
  return useContext(focusRequestContext).requestFocus;
}
