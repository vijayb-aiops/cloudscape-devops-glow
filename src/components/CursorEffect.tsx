import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  life: number;
  maxLife: number;
}

const CursorEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Add new trail point
      trailPointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 30,
        maxLife: 30,
      });

      // Limit trail length
      if (trailPointsRef.current.length > 30) {
        trailPointsRef.current.shift();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw trail points
      trailPointsRef.current = trailPointsRef.current.filter((point) => {
        point.life--;

        if (point.life > 0) {
          const opacity = point.life / point.maxLife;
          const size = 6 * opacity;

          // Draw smooth circle
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(29, 78, 216, ${opacity * 0.4})`;
          ctx.fill();

          // Add subtle glow
          const gradient = ctx.createRadialGradient(
            point.x,
            point.y,
            0,
            point.x,
            point.y,
            size * 2
          );
          gradient.addColorStop(0, `rgba(29, 78, 216, ${opacity * 0.2})`);
          gradient.addColorStop(1, "rgba(29, 78, 216, 0)");
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, size * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        return point.life > 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default CursorEffect;
