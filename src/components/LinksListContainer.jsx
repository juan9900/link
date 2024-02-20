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
import { updateLinksList } from "@/lib/handleFirestore";

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
    console.log(
      `active: ${JSON.stringify(active.id)} / over: ${JSON.stringify(over.id)}`
    );
    let newOrder = [];
    if (active.id !== over.id) {
      setUserLinks((items) => {
        const activeIndex = userLinks
          .map((link) => link.link)
          .indexOf(active.id);
        const overIndex = userLinks.map((link) => link.link).indexOf(over.id);

        console.log({ userLinks });
        // return updateLinksList(userLinks);
        newOrder = arrayMove(items, activeIndex, overIndex);
        return newOrder;
      });
      updateLinksList(authData.user.uid, newOrder);
    }
  };

  const handleNewLink = () => {
    console.log("triggered");
  };

  return (
    <div className="w-full ">
      <p>{userLinks && JSON.stringify(userLinks)}</p>
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
        {userLinks && (
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={userLinks.map((social) => social.link)}
          >
            <div className="w-4/6 mt-2">
              {userLinks.map((social) => (
                <SortableItem
                  social={social.social}
                  link={social.link}
                  id={social.link}
                  key={social.link}
                />
              ))}
            </div>
          </SortableContext>
        )}
      </DndContext>
    </div>
  );
}
