import React from 'react'
import { useInterval } from '../useInterval'
import { renderHook, act } from '@testing-library/react-hooks';

describe('The useGameStatus hook', () => {
  it('should not throw an error', () => {
    const { result } = renderHook(() => useInterval());
  });
});