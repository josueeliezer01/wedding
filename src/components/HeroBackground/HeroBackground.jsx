import "./HeroBackground.css";

export default function HeroBackground() {
  return (
    <div
      className="hero-bg"
      aria-hidden="true"
      role="presentation">
      <div className="hero-bg__spot hero-bg__spot--left" />
      <div className="hero-bg__spot hero-bg__spot--right" />

      <div className="hero-pattern" />
    </div>
  );
}
