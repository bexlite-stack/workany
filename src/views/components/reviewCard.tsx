import moment from "moment";
import uniqolor from "uniqolor";

export const ReviewCard = ({ name, content, updatedAt }: { name: string; content: string; updatedAt: string }) => {
  return (
    <div class="p-8 bg-slate-50 rounded-lg space-y-4">
      <div class="flex gap-4 items-center">
        <div style={{ backgroundColor: uniqolor(name).color }} class="flex justify-center items-center w-8 h-8 rounded-full text-white font-bold">
          I
        </div>
        <div class="flex gap-4 items-center justify-between">
          <h3>{name}</h3>
          <div class="text-sm text-slate-400">{moment(new Date(updatedAt)).fromNow()}</div>
        </div>
      </div>
      <div class="ml-12">
        <p class="text-slate-500 whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
};
