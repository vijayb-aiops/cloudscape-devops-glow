import { useEffect, useRef } from "react";

interface Drop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Matrix characters
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops
    const drops: Drop[] = [];
    for (let i = 0; i < columns; i++) {
      drops.push({
        x: i * fontSize,
        y: Math.random() * -canvas.height,
        speed: 0.5 + Math.random() * 1,
        length: 15 + Math.random() * 15,
        opacity: 0.3 + Math.random() * 0.3,
      });
    }

    const animate = () => {
      // Fade effect for trail
      ctx.fillStyle = "rgba(10, 15, 30, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((drop) => {
        // Draw characters in the drop trail
        for (let i = 0; i < drop.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const y = drop.y - i * fontSize;
          
          if (y > 0 && y < canvas.height) {
            // Calculate opacity based on position in trail
            const trailOpacity = drop.opacity * (1 - i / drop.length);
            
            // Green color with varying brightness
            const brightness = i === 0 ? 200 : 100 + (100 * (1 - i / drop.length));
            ctx.fillStyle = `rgba(0, ${brightness}, 0, ${trailOpacity})`;
            ctx.font = `${fontSize}px monospace`;
            ctx.fillText(char, drop.x, y);
          }
        }

        // Update drop position
        drop.y += drop.speed;

        // Reset drop when it goes off screen
        if (drop.y - drop.length * fontSize > canvas.height) {
          drop.y = Math.random() * -100;
          drop.speed = 0.5 + Math.random() * 1;
          drop.length = 15 + Math.random() * 15;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -2 }}
    />
  );
};

export default MatrixRain;
