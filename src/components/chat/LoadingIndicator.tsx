
export const LoadingIndicator = () => {
  return (
    <div className="text-center py-2">
      <div className="inline-flex gap-1">
        <div className="w-2 h-2 rounded-full bg-navy animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-navy animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-navy animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};
