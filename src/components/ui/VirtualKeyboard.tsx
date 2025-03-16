"use client";
import { useEffect, useState, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import layouts from "simple-keyboard-layouts";

interface VirtualKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const qwertyKeyCodeMap: { [key: string]: { row: number; pos: number } } = {
  KeyQ: { row: 0, pos: 0 },
  KeyW: { row: 0, pos: 1 },
  KeyE: { row: 0, pos: 2 },
  KeyR: { row: 0, pos: 3 },
  KeyT: { row: 0, pos: 4 },
  KeyY: { row: 0, pos: 5 },
  KeyU: { row: 0, pos: 6 },
  KeyI: { row: 0, pos: 7 },
  KeyO: { row: 0, pos: 8 },
  KeyP: { row: 0, pos: 9 },
  KeyA: { row: 1, pos: 0 },
  KeyS: { row: 1, pos: 1 },
  KeyD: { row: 1, pos: 2 },
  KeyF: { row: 1, pos: 3 },
  KeyG: { row: 1, pos: 4 },
  KeyH: { row: 1, pos: 5 },
  KeyJ: { row: 1, pos: 6 },
  KeyK: { row: 1, pos: 7 },
  KeyL: { row: 1, pos: 8 },
  KeyZ: { row: 2, pos: 1 },
  KeyX: { row: 2, pos: 2 },
  KeyC: { row: 2, pos: 3 },
  KeyV: { row: 2, pos: 4 },
  KeyB: { row: 2, pos: 5 },
  KeyN: { row: 2, pos: 6 },
  KeyM: { row: 2, pos: 7 },
  Digit1: { row: 0, pos: 0 },
  Digit2: { row: 0, pos: 1 },
  Digit3: { row: 0, pos: 2 },
  Digit4: { row: 0, pos: 3 },
  Digit5: { row: 0, pos: 4 },
  Digit6: { row: 0, pos: 5 },
  Digit7: { row: 0, pos: 6 },
  Digit8: { row: 0, pos: 7 },
  Digit9: { row: 0, pos: 8 },
  Digit0: { row: 0, pos: 9 },
};

export default function VirtualKeyboard({ value, onChange, language }: VirtualKeyboardProps) {
  const [layoutName, setLayoutName] = useState("default");
  const [isShifted, setIsShifted] = useState(false);
  const keyboardRef = useRef<any>(null);
  const layoutRef = useRef<any>(null);

  useEffect(() => {
    const initializeLayout = async () => {
      const layoutGenerator = new layouts();
      const langLayout = layoutGenerator.get(language);
      layoutRef.current = langLayout.layout;

      if (keyboardRef.current) {
        keyboardRef.current.setOptions({
          layout: langLayout.layout,
        });
      }
    };

    initializeLayout();
  }, [language]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      switch (e.code) {
        case "ShiftLeft":
        case "ShiftRight":
          if (!isShifted) handleShift();
          break;
        case "Backspace":
          onChange(value.slice(0, -1));
          break;
        case "Space":
          onChange(value + " ");
          break;
        case "Enter":
          onChange(value + "\n");
          break;
        default:
          if (qwertyKeyCodeMap[e.code]) {
            const { row, pos } = qwertyKeyCodeMap[e.code];
            const currentLayer = isShifted ? layoutRef.current?.shift?.[row] || layoutRef.current?.default[row] : layoutRef.current?.default[row];

            if (currentLayer && currentLayer[pos]) {
              const char = currentLayer[pos];
              onChange(value + char);

              if (isShifted) handleShift();
            }
          }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        setIsShifted(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [value, isShifted, onChange]);

  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(newLayoutName);
    setIsShifted(!isShifted);
  };

  return (
    <Keyboard
      keyboardRef={(r: any) => (keyboardRef.current = r)}
      layoutName={layoutName}
      onChange={onChange}
      onKeyPress={(button: string) => {
        if (button === "{shift}" || button === "{lock}") handleShift();
        if (button === "{enter}") onChange(value + "\n");
      }}
    />
  );
}
