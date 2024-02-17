import { useSortable } from "@dnd-kit/sortable";
import Draggable from "./Draggable";
import { CSS } from "@dnd-kit/utilities";

export default function LinkCard({ link }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: link.social,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="w-fit my-5 p-3 rounded-md bg-gray-500"
    >
      <h3 className="font-bold text-gray-200">{link.social}</h3>
      <a target="_blank" href={`https://${link.link}`}>
        {link.link}
      </a>
    </div>
  );
}
