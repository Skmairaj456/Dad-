export const Footer = () => {
  return (
    <footer className="site-footer border-t border-white/10 bg-muted/30 px-5 py-7 sm:px-6">
      <div className="content-wrap flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Deutsche Auto Den. All rights reserved.</p>
        <p className="font-mono uppercase tracking-[0.16em]">Engineered for the road ahead.</p>
      </div>
    </footer>
  );
};
