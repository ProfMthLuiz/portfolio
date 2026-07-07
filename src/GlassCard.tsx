import "./css/Glass.css";

import gsap from "gsap";
import { useRef, useLayoutEffect } from "react";

interface GlassCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: "mint" | "violet" | "ocean";
  href?: string;
}

const GlassCard = ({
  title,
  description,
  icon,
  color = "mint",
  href,
}: GlassCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useRef<gsap.QuickToFunc | null>(null);
  const rotateY = useRef<gsap.QuickToFunc | null>(null);
  const scale = useRef<gsap.QuickToFunc | null>(null);

  useLayoutEffect(() => {
    if (!cardRef.current) return;

    rotateX.current = gsap.quickTo(cardRef.current, "rotationX", {
      duration: 0.4,
      ease: "power3.out",
    });

    rotateY.current = gsap.quickTo(cardRef.current, "rotationY", {
      duration: 0.4,
      ease: "power3.out",
    });

    scale.current = gsap.quickTo(cardRef.current, "scale", {
      duration: 0.4,
      ease: "power3.out",
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateYValue = (x / rect.width - 0.5) * 18;
    const rotateXValue = -(y / rect.height - 0.5) * 18;

    rotateX.current?.(rotateXValue);
    rotateY.current?.(rotateYValue);
    scale.current?.(1.03);
  };

  const handleMouseLeave = () => {
    rotateX.current?.(0);
    rotateY.current?.(0);
    scale.current?.(1);
  };

  return (
    <div
      className={`ux-parent ux-parent--${color}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="ux-card" ref={cardRef}>
        <div className="ux-logo" aria-hidden>
          <span className="ux-circle" />
          <span className="ux-circle" />
          <span className="ux-circle" />
          <span className="ux-circle" />

          <span className="ux-circle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.667 31.69">
              <path d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z" />
              <path
                d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z"
                transform="translate(-45.91 0)"
              />
              <path
                d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z"
                transform="translate(0 -51.963)"
              />
            </svg>
          </span>
        </div>

        <div className="ux-glass" />

        <div className="ux-content">
          <span className="ux-title">{title}</span>

          <span className="ux-text">{description}</span>
        </div>

        <div className="ux-bottom">
          <div className="ux-social">
            <button className="ux-social-btn" aria-label="Instagram">
              {icon}
            </button>

            <button className="ux-social-btn" aria-label="X">
              {icon}
            </button>

            <button className="ux-social-btn" aria-label="Discord">
              {icon}
            </button>
          </div>

          <div className="ux-more">
            <a className="ux-more-btn" href={href} target="_blank">
              <span>Open</span>
            </a>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassCard;
