import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IoTrashOutline } from "react-icons/io5";
import { AlertDialogOverlay } from "@radix-ui/react-alert-dialog";

type AlertProp = {
  handleDelete: any;
};

const DeleteAlertBox = ({ handleDelete }: AlertProp) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="cursor-pointer">
        <IoTrashOutline size={17} />
      </AlertDialogTrigger>
      <AlertDialogOverlay className="AlertDialogOverlay" />
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to delete this record?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete your record from your
            system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 ease-in-out duration-200">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 text-white hover:bg-red-600 ease-in-out duration-200"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertBox;
