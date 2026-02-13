const AdPlaceholder = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`ad-placeholder rounded-lg flex items-center justify-center py-4 px-6 ${className}`}>
      <span className="text-muted-foreground text-xs tracking-widest uppercase">Publicitate</span>
    </div>
  );
};

export default AdPlaceholder;
