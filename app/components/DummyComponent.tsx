import React, { useRef } from "react";
import useOnScreen from "./useOnScreen";

const DummyComponent = () => {
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  return <div ref={ref}>{isVisible && `Yep, I'm on screen`}</div>;
};
