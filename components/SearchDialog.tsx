import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoIosSearch } from "react-icons/io";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { sidebarLinks } from "@/constants";
import Link from "next/link";

const SearchDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded-full hover:bg-gray-50 p-2 cursor-pointer ease-in-out duration-200 block max-md:hidden">
          <IoIosSearch size={20} className="text-gray-700" />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader className="mt-6 ">
          <Input />
        </DialogHeader>

        <div className="border-b border-gray-300 mt-3" />

        <DialogDescription>
          <ScrollArea className="h-[200px] w-full mt-1">
            <h6 className="font-semibold text-18 mb-3">Quick Page Links</h6>
            {sidebarLinks.map((item) => {
              return (
                <Link
                  href={item.route}
                  key={item.label}
                  className="text-gray-600 text-15"
                >
                  <div className="flex flex-col gap-1 p-2 hover:bg-primary hover:text-white rounded-md ease-in-out duration-200">
                    <p>{item.label}</p>
                    <p>{item.route}</p>
                  </div>
                </Link>
              );
            })}
          </ScrollArea>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
