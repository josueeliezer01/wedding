import "./HeroBackground.css";

export default function HeroBackground() {
  return (
    <div
      className="hero-bg"
      aria-hidden="true">
      <div className="hero-bg__spot hero-bg__spot--left" />
      <div className="hero-bg__spot hero-bg__spot--right" />

      <svg className="hero-svg-canvas">
        <defs>
          <pattern
            id="jg-pattern"
            x="0"
            y="0"
            width="180"
            height="180"
            patternUnits="userSpaceOnUse">
            <g transform="rotate(-20 90 90)">
              <text
                x="45"
                y="95"
                fill="#d4af37"
                fontFamily="'Rouge Script', cursive"
                fontSize="48"
                textAnchor="middle">
                J
              </text>
              <text
                x="90"
                y="95"
                fill="#d4af37"
                fontFamily="'Rouge Script', cursive"
                fontSize="26"
                textAnchor="middle">
                &amp;
              </text>
              <text
                x="135"
                y="95"
                fill="#d4af37"
                fontFamily="'Rouge Script', cursive"
                fontSize="48"
                textAnchor="middle">
                G
              </text>
            </g>
          </pattern>
        </defs>

        <rect
          className="hero-pattern-rect"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          fill="url(#jg-pattern)"
        />
      </svg>
    </div>
  );
}
