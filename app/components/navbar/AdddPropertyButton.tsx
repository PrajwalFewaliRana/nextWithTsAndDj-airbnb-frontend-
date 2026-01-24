"use client";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import useLoginModel from "@/app/hooks/useLoginModel";
import React from "react";

interface AddPropertyButtonProps {
  userId?: string | null;
}

const AdddPropertyButton: React.FC<AddPropertyButtonProps> = ({ userId }) => {
  const loginModal = useLoginModel();
  const addPropertyModal = useAddPropertyModal();
  const airbnbYourHome = () => {
    // if (userId) {
    //   addPropertyModal.open();
    // }
    //  else {
    //   loginModal.open();
    // }
    addPropertyModal.open()
  };
  return (
    <div
      onClick={airbnbYourHome}
      className="p-2 text-sm font-semibold rounded-full cursor-pointer hover:bg-gray-200"
    >
      Djangobnb your home
    </div>
  );
};

export default AdddPropertyButton;
