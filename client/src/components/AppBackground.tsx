/**
 * Site-wide atmospheric background. Rendered once in _app.tsx.
 * All motion is CSS-only; respects prefers-reduced-motion.
 */
export default function AppBackground() {
  return (
    <div className="app-background" aria-hidden="true">
      <div className="app-background__layer app-background__layer--base" />
      <div className="app-background__layer app-background__layer--glow" />
      <div className="app-background__layer app-background__layer--mesh" />
      <div className="app-background__layer app-background__layer--texture" />
      <div className="app-background__layer app-background__layer--aurora app-background__layer--aurora-left" />
      <div className="app-background__layer app-background__layer--aurora app-background__layer--aurora-right" />
      <div className="app-background__layer app-background__layer--grid" />
    </div>
  );
}
