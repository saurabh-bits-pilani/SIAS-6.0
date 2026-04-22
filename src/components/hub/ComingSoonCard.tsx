interface ComingSoonCardProps {
  title: string;
  sanskrit?: string;
}

export default function ComingSoonCard({ title, sanskrit }: ComingSoonCardProps) {
  return (
    <div
      role="listitem"
      aria-disabled="true"
      className="relative rounded-2xl border border-gray-200 bg-gray-100/60 px-6 py-10 text-center cursor-default select-none opacity-70"
    >
      <span className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full">
        Coming Soon
      </span>
      <h3 className="font-caveat text-3xl text-gray-800 leading-tight">{title}</h3>
      {sanskrit ? (
        <p className="font-devanagari text-xl text-gray-600 mt-2">{sanskrit}</p>
      ) : null}
    </div>
  );
}
