import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // REPLACE THE OLD RETURN WITH THIS ONE
  return (
    <div
      className="pointer-events-none fixed z-0 transition-all duration-500 ease-out"
      style={{
        left: position.x - 250,
        top: position.y - 250,
      }}
    >
      <div className="relative">
        <div className="absolute w-[350px] h-[350px] bg-cyan-500/15 rounded-full blur-[140px]" />

        <div className="absolute w-[300px] h-[300px] bg-purple-500/15 rounded-full blur-[140px] translate-x-20 translate-y-20" />
      </div>
    </div>
  );
}