import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import "./Confetti.css";

export default function Confetti({
  start = false,
  duration = 4500,
  particleCount = 60,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const intervalRef = useRef(null);

  const ctxRef = useRef(null);
  const DPRRef = useRef(1);
  const particlesRef = useRef([]);
  const runningRef = useRef(false);
  const mountedRef = useRef(false);
  const reduce = useReducedMotion();

  const colors = ["#D4AF37", "#F2D27F", "#AA8C49", "#E5E4E2", "#FFFFFF"];

  const random = (min, max) => Math.random() * (max - min) + min;

  useEffect(() => {
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const particles = particlesRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    mountedRef.current = true;

    const resize = () => {
      DPRRef.current = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(canvas.clientWidth * DPRRef.current);
      canvas.height = Math.floor(canvas.clientHeight * DPRRef.current);
      ctx.setTransform(DPRRef.current, 0, 0, DPRRef.current, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    function createBurst(fromLeft = true, count = 30) {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const baseX = fromLeft ? 8 : w - 8;
      const baseY = h - 8;
      const spread = Math.PI * 0.45;
      const bias = fromLeft ? 0.18 : -0.18;

      for (let i = 0; i < count; i++) {
        const ang = -Math.PI / 2 + bias + random(-spread / 4, spread / 4);
        const speed = random(16, 28);
        const size = random(6, 14);
        const rotate = random(0, Math.PI * 2);
        const rotateSpeed = random(-0.25, 0.25);

        particlesRef.current.push({
          x: baseX,
          y: baseY,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          size,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: "rect",
          rotate,
          rotateSpeed,
          ttl: random(duration * 1.5, duration * 2.0),
          age: 0,
          drag: random(0.992, 0.996),
          gravity: random(0.06, 0.14),
          opacity: 1,
          wobble: random(0, Math.PI * 2),
          wobbleSpeed: random(0.02, 0.05),
        });
      }
    }

    let lastTime = performance.now();
    function frame(now) {
      const dt = Math.min(40, now - lastTime);
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const dtFactor = dt / 16.6667;

        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity * dtFactor;
        p.wobble += p.wobbleSpeed * dtFactor;

        const wobbleX = Math.sin(p.wobble) * 0.8;
        p.x += (p.vx + wobbleX) * dtFactor;
        p.y += p.vy * dtFactor;
        p.rotate += p.rotateSpeed * dtFactor;
        p.age += dt;

        const lifeRatio = p.age / p.ttl;
        if (lifeRatio > 0.9)
          p.opacity = Math.max(0, 1 - (lifeRatio - 0.9) / 0.1);

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotate);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2.5);

        ctx.restore();

        if (
          p.y > canvas.clientHeight + 160 ||
          p.x < -160 ||
          p.x > canvas.clientWidth + 160 ||
          p.age > p.ttl + 400
        ) {
          particles.splice(i, 1);
        }
      }

      if (runningRef.current || particlesRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        rafRef.current = null;
      }
    }

    function startRunLocal() {
      if (runningRef.current) return;
      runningRef.current = true;
      lastTime = performance.now();

      createBurst(true, Math.floor(particleCount * 1.0));
      createBurst(false, Math.floor(particleCount * 1.0));

      const began = performance.now();
      intervalRef.current = setInterval(() => {
        const elapsed = performance.now() - began;
        const factor = 1 - Math.min(1, elapsed / duration);
        const count = Math.max(8, Math.floor(particleCount * factor));
        createBurst(true, count);
        createBurst(false, count);

        if (elapsed >= duration) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          runningRef.current = false;
        }
      }, 420);

      if (!rafRef.current) rafRef.current = requestAnimationFrame(frame);
    }

    function stopRunLocal() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      runningRef.current = false;
    }

    startRunLocalRef.current = startRunLocal;
    stopRunLocalRef.current = stopRunLocal;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      particles.length = 0;
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      mountedRef.current = false;
    };
  }, [duration, particleCount, reduce]);

  const startRunLocalRef = useRef(null);
  const stopRunLocalRef = useRef(null);

  useEffect(() => {
    if (reduce) return;
    if (!mountedRef.current) return;
    if (start) {
      startRunLocalRef.current?.();
    } else {
      stopRunLocalRef.current?.();
    }
  }, [start, reduce]);

  if (reduce) return null;
  return (
    <canvas
      aria-hidden="true"
      ref={canvasRef}
      className="confetti-canvas"
    />
  );
}
