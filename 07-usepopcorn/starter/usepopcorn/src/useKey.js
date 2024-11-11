import { useEffect } from "react";

export function useKey(keyPressed, action) {
  useEffect(
    function () {
      function callBack(event) {
        if (event.code.toLowerCase() === keyPressed.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callBack);

      return () => document.removeEventListener("keydown", callBack);
    },
    [action, keyPressed]
  );
}
