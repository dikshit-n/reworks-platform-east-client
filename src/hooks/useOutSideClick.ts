import React, { MutableRefObject, useEffect } from "react";

export function useOutsideClick(
  ref: React.RefObject<HTMLElement> | MutableRefObject<any>,
  func: (event: MouseEvent) => any
) {
  useEffect(() => {
    /**
     * trigger the callback if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        func(event);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
