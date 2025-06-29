export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1368px] mx-auto px-4 sm:px-12">
      {children}
    </div>
  );
}
