import { useEffect, useRef } from "react";
import { animate, inView } from "@motionone/dom";

/**
 * Attach to any element ref to trigger a reveal animation when it enters viewport.
 * @param {object} options
 * @param {string} options.variant - "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleUp"
 * @param {number} options.delay   - extra delay in seconds (default 0)
 * @param {number} options.duration- animation duration in seconds (default 0.6)
 */
export function useScrollReveal({ variant = "fadeUp", delay = 0, duration = 0.6 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const variants = {
      fadeUp:    { initial: { opacity: 0, transform: "translateY(32px)" }, animate: { opacity: 1, transform: "translateY(0px)" } },
      fadeIn:    { initial: { opacity: 0 },                                animate: { opacity: 1 } },
      slideLeft: { initial: { opacity: 0, transform: "translateX(-40px)" }, animate: { opacity: 1, transform: "translateX(0px)" } },
      slideRight:{ initial: { opacity: 0, transform: "translateX(40px)" },  animate: { opacity: 1, transform: "translateX(0px)" } },
      scaleUp:   { initial: { opacity: 0, transform: "scale(0.88)" },       animate: { opacity: 1, transform: "scale(1)" } },
    };

    const { initial, animate: target } = variants[variant] || variants.fadeUp;

    // Set initial state
    Object.assign(el.style, { opacity: initial.opacity ?? 1, transform: initial.transform ?? "none" });

    const stop = inView(el, () => {
      animate(
        el,
        target,
        { duration, delay, easing: [0.22, 1, 0.36, 1] }
      );
    }, { amount: 0.15 });

    return () => stop?.();
  }, [variant, delay, duration]);

  return ref;
}

/**
 * Stagger-reveal for a list of children.
 * Apply the returned ref to the parent container.
 */
export function useStaggerReveal({ variant = "fadeUp", stagger = 0.1, duration = 0.55 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const parent = ref.current;
    if (!parent) return;
    const children = Array.from(parent.children);

    const variants = {
      fadeUp:    { opacity: [0, 1], transform: ["translateY(28px)", "translateY(0px)"] },
      fadeIn:    { opacity: [0, 1] },
      scaleUp:   { opacity: [0, 1], transform: ["scale(0.9)", "scale(1)"] },
      slideLeft: { opacity: [0, 1], transform: ["translateX(-32px)", "translateX(0px)"] },
    };

    const target = variants[variant] || variants.fadeUp;

    children.forEach((child) => {
      Object.assign(child.style, { opacity: 0 });
    });

    const stop = inView(parent, () => {
      children.forEach((child, i) => {
        animate(child, target, { duration, delay: i * stagger, easing: [0.22, 1, 0.36, 1] });
      });
    }, { amount: 0.1 });

    return () => stop?.();
  }, [variant, stagger, duration]);

  return ref;
}
