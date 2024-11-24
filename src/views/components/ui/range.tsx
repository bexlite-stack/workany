export const Range = ({ name, label, minLabel, maxLabel }: { name: string; label: string; minLabel: string; maxLabel: string }) => {
  return (
    <div class="select-none">
      <label class="font-medium px-1">{label}</label>
      <input name={name} type="range" class="p-0 focus:border-0" max={10} min={1} step="0.5" />
      <div class="flex justify-between items-center text-slate-400 px-1">
        <div>{minLabel}</div>
        <div>{maxLabel}</div>
      </div>
    </div>
  );
};
