import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa";

import { useForm } from "react-hook-form";
import { createNewLink } from "@/lib/handleFirestore";

export function NewLinkDialog({ uid }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("triggered");
    try {
      const res = createNewLink(uid, watch("linkName"), watch("linkUrl"));
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary">
          <FaPlus className="mr-2" />
          New Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create a new link</DialogTitle>
            <DialogDescription>
              Enter the display title for the link and the corresponding URL to
              website
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="name"
                className="col-span-3"
                {...register("linkName", {
                  required: {
                    value: true,
                    message: "The new link name is required",
                  },
                  minLength: {
                    value: 1,
                    message: "The username cannot be blank",
                  },
                  maxLength: {
                    value: 15,
                    message: "The username is too long",
                  },
                })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                URL
              </Label>
              <Input
                id="username"
                className="col-span-3"
                {...register("linkUrl", {
                  required: {
                    value: true,
                    message: "The new link url is required",
                  },
                  minLength: {
                    value: 1,
                    message: "The username cannot be blank",
                  },
                  maxLength: {
                    value: 25,
                    message: "The username is too long",
                  },
                })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add link</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
