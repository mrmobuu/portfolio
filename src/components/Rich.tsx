// Renders "**highlighted**" segments as amber mono readouts.
export function Rich({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-mono text-[0.92em] font-medium text-amber">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
