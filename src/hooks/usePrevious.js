import { useEffect, useRef } from 'react';

// Hook để lưu trữ giá trị trước đó của một biến
export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
