import { useState } from "react";
import NewLinkButton from "./NewLinkButton";
import NewLinkModal from "./NewLinkModal";

export default function LinksList({ linksList }) {
  const [showModal, setShowModal] = useState(false);
  function newLinkHandler() {
    setShowModal((prev) => !prev);
    console.log("pressed");
  }

  return (
    <>
      {console.log(linksList)}
      {linksList.length > 0 ? (
        linksList.map((link) => (
          <div className="w-fit my-5 p-3 rounded-md bg-gray-500">
            <h3 className="font-bold text-gray-200">{link.social}</h3>
            <a target="_blank" href={`https://${link.link}`}>
              {link.link}
            </a>
          </div>
        ))
      ) : (
        <p>No has agregado ningún link</p>
      )}
      <NewLinkButton newLinkHandler={newLinkHandler} />
      <NewLinkModal showModal={showModal} />
    </>
  );
}
