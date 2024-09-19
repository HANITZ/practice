import { CreateKeypad } from 'pages/remotes';
import { KeyboardEvent, RefObject, useCallback, useEffect, useRef, useState } from 'react';

interface UseKeypadReturn {
  handleFocus: () => void;
  keypadRef: RefObject<HTMLDivElement>;
  open: boolean;
  handleClickKeypad: (rowIdx: number, colIdx: number) => void;
  handleSubmit: () => void;
  handleBackKey: () => void;
  handleRemoveAll: () => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  keys: Array<{ x: number; y: number }>;
}

export const useKeypad = (
  inputRef: RefObject<HTMLInputElement>,
  refresh: () => void,
  data: CreateKeypad
): UseKeypadReturn => {
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState<Array<{ x: number; y: number }>>([]);
  const keypadRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        keypadRef.current &&
        !keypadRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    },
    [inputRef]
  );

  const handleBackKey = () => {
    setKeys(prev => [...prev.slice(0, prev.length - 1)]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      setKeys(prev => [...prev.slice(0, prev.length - 1)]);
    }
  };
  const handleRemoveAll = () => {
    setKeys([]);
  };
  const handleSubmit = () => {
    if (keys.length !== 6) {
      setKeys([]);
    }
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [inputRef, handleClickOutside]);
  const handleFocus = () => {
    setOpen(true);
  };

  const shuffleArrKeypad = [data.keypad.functionKeys[1].rowIndex, data.keypad.functionKeys[1].columnIndex];
  const noneArrKeypad = [data.keypad.functionKeys[0].rowIndex, data.keypad.functionKeys[0].columnIndex];
  const handleClickKeypad = (rowIdx: number, colIdx: number) => {
    if (keys.length >= 6) {
      return;
    }

    if (rowIdx === shuffleArrKeypad[0] && colIdx === shuffleArrKeypad[1]) {
      refresh();
      setKeys([]);
      return;
    }
    if (rowIdx === noneArrKeypad[0] && colIdx === noneArrKeypad[1]) {
      return;
    }
    setKeys(prev => [...prev, { x: rowIdx, y: colIdx }]);
  };

  return {
    handleFocus,
    keypadRef,
    open,
    handleClickKeypad,
    keys,
    handleSubmit,
    handleBackKey,
    handleRemoveAll,
    handleKeyDown,
  };
};
