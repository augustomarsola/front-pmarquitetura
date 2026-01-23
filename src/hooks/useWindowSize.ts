"use client";

import { useEffect, useState } from "react";

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Define o tamanho inicial
    handleResize();

    // Adiciona o event listener
    window.addEventListener("resize", handleResize);

    // Remove o event listener na desmontagem
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
