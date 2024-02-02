import styled from "styled-components";
import { useForm } from "react-hook-form";

export default function NewLinkModal({ showModal }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {};

  const Modal = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: ${(props) => (props.showModal ? 1 : 0)};
    animation-name: appear;
    animation-duration: ${(props) => (props.showModal ? ".3s" : ".5s")};
    animation-timing-function: ease-in-out;
    @keyframes appear {
      0% {
        opacity: ${(props) => (props.showModal ? 0 : 1)};
      }
      100% {
        opacity: ${(props) => (props.showModal ? 1 : 0)};
      }
    }
  `;
  return (
    <>
      {showModal && (
        <Modal
          className="bg-slate-200 rounded-lg p-5 w-5/6 h-4/6  md:w-2/6 md:h-3/6"
          showModal={showModal}
        >
          <h3 className="text-center font-semibold text-2xl pt-2">
            Create a new link
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
            <label>Title</label>
            <input
              className="rounded-md"
              type="text"
              {...register("socialTitle", {
                minLength: { value: 1, message: "The title cannot be blank" },
                maxLength: { value: 15, message: "The title is too long" },
                required: { value: true, message: "The title is required" },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "The name is not valid",
                },
              })}
            />
            {errors.socialTitle && (
              <p className="text-red-500">{errors.socialTitle.message}</p>
            )}
            <label>Link</label>
            <input className="rounded-md" type="text" place />
          </form>

          <button className="bg-violet-500 hover:bg-violet-800 p-1 text-white rounded-md w-2/6 block mt-5 mx-auto">
            Guardar
          </button>
        </Modal>
      )}
    </>
  );
}
