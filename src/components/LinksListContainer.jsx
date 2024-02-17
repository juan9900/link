"use client";
import { useContext } from "react";
import { AuthContext } from "@/providers/authProvider";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import SortableItem from "./SortableItem";

//Icons
import { FaPlus, FaGripVertical } from "react-icons/fa";
import { NewLinkDialog } from "./NewLinkDialog";

export default function LinksListContainer({ userLinks, setUserLinks }) {
  const authData = useContext(AuthContext);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setUserLinks((items) => {
        const activeIndex = userLinks
          .map((link) => link.index)
          .indexOf(active.id);
        const overIndex = userLinks.map((link) => link.index).indexOf(over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  const handleNewLink = () => {
    console.log("triggered");
  };

  return (
    <div className="w-full ">
      <p>{JSON.stringify(authData.user.uid)}</p>
      <NewLinkDialog uid={authData.user.uid} />
      <p className="text-sm text-gray-400 mt-5">
        Drag and drop the links from the{" "}
        <kbd className="kbd kbd-sm">
          <FaGripVertical />
        </kbd>{" "}
        icon to organize the order
      </p>
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={userLinks.map((link) => link.index)}
        >
          <div className="w-4/6 mt-2">
            {userLinks.map((link) => (
              <SortableItem
                social={link.social}
                link={link.link}
                id={link.index}
                key={link.social}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
