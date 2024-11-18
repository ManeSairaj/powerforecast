"use client";
import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import CloseButton from "../Button/CloseButton";

export function Profile() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="w-1/2 ml-auto rounded-none p-4 md:p-12 lg:px-16 shadow-input bg-gray-400 dark:bg-slate-950 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-35">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 w-full flex justify-between">
        <p>Profile Page</p>
        <CloseButton />
      </h2>
      <p className="flex text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Filling ensures higher safety <ArrowUpRight />
      </p>
      <div className="bg-gradient-to-r from-neutral-300 via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="name">Name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="number">Phone Number</Label>
            <Input id="num" placeholder="9876543210" type="number" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-12">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@gmail.com"
            type="email"
          />
        </LabelInputContainer>
        {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}

        <LabelInputContainer className="mb-1">
          <Label className="text-xl font-semibold opacity-90">
            Nearest Fire Station
          </Label>
        </LabelInputContainer>
        <div className="bg-gradient-to-r from-neutral-300 via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <LabelInputContainer className="mb-4">
          <Label htmlFor="stationL">Location</Label>
          <Input id="stationLocation" placeholder="Adam St." type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="stationP">Phone Number</Label>
          <Input id="stationNumber" placeholder="9876543210" type="text" />
        </LabelInputContainer>

        <LabelInputContainer className="mb-1">
          <Label className="text-xl font-semibold opacity-90">
            Emergency Contact's
          </Label>
        </LabelInputContainer>
        <div className="bg-gradient-to-r from-neutral-300 via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <LabelInputContainer className="mb-4">
          <Label htmlFor="enumber1">Phone Number 1</Label>
          <Input id="enum1" placeholder="9876543210" type="number" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="enumber2">Phone Number 2</Label>
          <Input id="enum2" placeholder="9876543210" type="number" />
        </LabelInputContainer>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Save up &rarr;
          <BottomGradient />
        </button>

        {/* <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div> */}
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
