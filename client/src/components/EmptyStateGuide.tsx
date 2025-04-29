// src/components/EmptyState.tsx
interface EmptyStateGuideProps {
  message: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function EmptyStateGuide({
  message,
  icon,
  className = "",
}: EmptyStateGuideProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full pt-4${className}`}
    >
      {icon && <div className="mb-2">{icon}</div>}
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
