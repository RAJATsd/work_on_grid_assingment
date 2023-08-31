import React, { useEffect, useRef } from "react";

function OnVisiblePrint({ val }) {
  const componentRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.01,
    };

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        console.log(val);

        observer.unobserve(componentRef.current);
      }
    }, options);

    observer.observe(componentRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={componentRef}
      key={val}
      style={{
        background: "blue",
        color: "white",
        height: "180px",
        fontSize: "3rem",
      }}
    >
      {val}
    </div>
  );
}

const NewGrid = ({ columns = 4, boxes = 29 }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        columnGap: "10px",
        rowGap: "10px",
      }}
    >
      {Array.from({ length: boxes }, (_, index) => index + 1).map((val) => (
        <OnVisiblePrint key={val} val={val} />
      ))}
    </div>
  );
};

export default NewGrid;
