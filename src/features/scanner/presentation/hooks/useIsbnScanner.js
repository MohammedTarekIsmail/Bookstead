import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { lookupBookByIsbnUseCase } from "../../../../core/di/injectionContainer";

// A book barcode fires onBarcodeScanned repeatedly (once per camera frame
// that detects it), so hasScannedRef stops us from starting a second lookup
// for the same scan before the first one finishes.
function useIsbnScanner(onBookFound) {
  const [status, setStatus] = useState("idle"); // idle | looking-up | not-found | error
  const hasScannedRef = useRef(false);

  // Scanner is a tab screen, so it stays mounted underneath Book Detail
  // instead of unmounting when you navigate there. Without this, coming
  // back from Book Detail would land on the same screen instance still
  // stuck on "looking-up" from the scan that found it — which also
  // disables the camera's scan handler, freezing it entirely.
  useFocusEffect(
    useCallback(() => {
      hasScannedRef.current = false;
      setStatus("idle");
    }, [])
  );

  async function handleBarcodeScanned({ data }) {
    if (hasScannedRef.current) return;
    hasScannedRef.current = true;
    setStatus("looking-up");

    try {
      const book = await lookupBookByIsbnUseCase.execute(data);
      if (book) {
        onBookFound(book);
      } else {
        setStatus("not-found");
      }
    } catch (error) {
      setStatus("error");
    }
  }

  function reset() {
    hasScannedRef.current = false;
    setStatus("idle");
  }

  return { status, handleBarcodeScanned, reset };
}

export default useIsbnScanner;
