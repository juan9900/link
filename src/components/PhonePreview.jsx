import { FaUser } from "react-icons/fa";

export default function PhonePreview({ userLinks }) {
  return (
    <div className="w-full">
      <div className="mockup-phone">
        <div className="camera"></div>
        <div className="display ">
          <div className="safezone py-10 bg-slate-400">
            <div className="artboard pt-10 flex flex-col justify-start items-center  phone-1  relative">
              <div className="flex justify-center items-center bg-gray-200 rounded-full w-[4rem] h-[4rem] relative top-0">
                <FaUser className="text-2xl" />
              </div>
              <div className="w-4/6 mt-10">
                {userLinks.map((link) => (
                  <div className="bg-gray-100 px-2 py-1 my-2 rounded-full w-full">
                    <p className="text-gray-800">{link.social}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
