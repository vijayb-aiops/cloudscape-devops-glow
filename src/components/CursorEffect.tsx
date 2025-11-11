import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  opacity: number;
}

const CursorEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
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

    // Warm fog colors - amber, orange, yellow, gold
    const colors = [
      "rgba(251, 191, 36, 0.4)",   // amber
      "rgba(249, 115, 22, 0.35)",  // orange
      "rgba(234, 179, 8, 0.4)",    // yellow
      "rgba(217, 119, 6, 0.35)",   // dark orange
      "rgba(245, 158, 11, 0.4)",   // amber variant
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Calculate speed for reactive fog
      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Create more particles based on speed
      const particleCount = Math.min(Math.floor(speed / 3) + 1, 5);
      
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 0.5 + Math.random() * 0.5;
        
        // Size and life based on speed
        const sizeFactor = Math.min(speed / 20, 2);
        const size = (40 + Math.random() * 60) * (0.8 + sizeFactor * 0.2);
        const maxLife = 60 + Math.random() * 40;

        particlesRef.current.push({
          x: mouse.x + (Math.random() - 0.5) * 30,
          y: mouse.y + (Math.random() - 0.5) * 30,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: maxLife,
          maxLife,
          size,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.life--;
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Fade in and out with smooth transitions
        const lifeRatio = particle.life / particle.maxLife;
        if (lifeRatio > 0.7) {
          // Fade in
          particle.opacity = (1 - lifeRatio) / 0.3;
        } else if (lifeRatio < 0.3) {
          // Fade out
          particle.opacity = lifeRatio / 0.3;
        } else {
          particle.opacity = 1;
        }

        // Slow down particles over time
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Draw soft fog with multiple layers for depth
        if (particle.life > 0 && particle.opacity > 0) {
          // Outer glow
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 1.5
          );
          
          const colorWithOpacity = particle.color.replace(/[\d.]+\)$/g, 
            `${particle.opacity * 0.15})`
          );
          const colorCenterWithOpacity = particle.color.replace(/[\d.]+\)$/g, 
            `${particle.opacity * 0.35})`
          );

          gradient.addColorStop(0, colorCenterWithOpacity);
          gradient.addColorStop(0.3, colorWithOpacity);
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.filter = "blur(20px)";
          ctx.fillStyle = gradient;
          ctx.fillRect(
            particle.x - particle.size * 1.5,
            particle.y - particle.size * 1.5,
            particle.size * 3,
            particle.size * 3
          );

          // Inner core for more defined center
          const coreGradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 0.6
          );
          
          const coreColor = particle.color.replace(/[\d.]+\)$/g, 
            `${particle.opacity * 0.5})`
          );
          
          coreGradient.addColorStop(0, coreColor);
          coreGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.filter = "blur(10px)";
          ctx.fillStyle = coreGradient;
          ctx.fillRect(
            particle.x - particle.size * 0.6,
            particle.y - particle.size * 0.6,
            particle.size * 1.2,
            particle.size * 1.2
          );

          ctx.filter = "none";
        }

        return particle.life > 0;
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
      style={{ zIndex: 0 }}
    />
  );
};

export default CursorEffect;
