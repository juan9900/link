import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaGripVertical, FaLink, FaEdit } from "react-icons/fa";

export default function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="bg-neutral-50 border-2 border-primary rounded-lg px-5 py-3 relative mb-2.5"
      style={style}
      ref={setNodeRef}
    >
      <div className="flex flex-row justify-start items-center">
        <h3 className="font-extrabold text-xl ">{props.social}</h3>
        <button>
          <FaEdit className="ml-2 mb-2 text-xl text-primary" />
        </button>
      </div>
      <div className="flex flex-row justify-start items-center">
        <p>{props.link}</p>
        <a className="ml-2" href={`http://${props.link}`} target="_blank">
          <FaLink />
        </a>
      </div>
      <div
        className="hover:cursor-grab absolute top-2/4 right-12 -translate-y-1/2 flex justify-center items-center"
        {...attributes}
        {...listeners}
      >
        <FaGripVertical className="text-neutral-400" />
      </div>
    </div>
  );
}
