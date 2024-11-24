export const RangeRating = ({ rating, label, minLabel, maxLabel }: { rating: number; label: string; minLabel: string; maxLabel: string }) => {
  function getColor(rating: number) {
    if (rating > 6.5) {
      return "bg-emerald-500";
    } else if (rating > 5) {
      return "bg-blue-500";
    } else {
      return "bg-rose-500";
    }
  }

  return (
    <div class="select-none space-y-1">
      <label class="font-medium px-1">{label}</label>
      <div class="w-full h-2 rounded-full overflow-hidden bg-slate-300">
        <div style={{ width: `${rating * 10}%` }} class={`${getColor(rating)} h-full`}></div>
      </div>
      <div class="flex justify-between items-center text-slate-400 px-1">
        <div>{minLabel}</div>
        <div>{maxLabel}</div>
      </div>
    </div>
  );
};
