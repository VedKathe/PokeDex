// Filename - components/ReadMore.js

import React, { useState } from "react";
import './readmore.css'

const Modal = ({ children, onClose }: { children: string, onClose: any }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  ">
      <div className="absolute inset-0  "></div>
      <div className="relative  rounded-lg p-8 w-[42rem] bg-[#2E3156] ">
        <span
          className="absolute top-0 right-0 cursor-pointer   p-2 text-white"
          onClick={onClose}
        >
          &times;
        </span>
        <p className="text-white text-sm  h-[20rem] overflow-auto ">{children}</p>
      </div>
    </div>
  );
};

const ReadMore = ({ children }: { children: string }) => {
  const text = children.replace(/(\r\n|\n|\r|\f)/gm, " ");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <p className="text">
        <div className="main-text">
          {`${text.slice(0, 368)}`}
        </div>
        <span
          onClick={toggleModal}
          className="read-or-hide"
          style={{ color: "#2E3156", fontWeight: "700", cursor: "pointer" }}
        >
          {isModalOpen ? " Show less" : " Read more"}
        </span>
      </p>
      {isModalOpen && <Modal onClose={toggleModal}>{text}</Modal>}
    </>
  );
};

const Content = ({ text }: { text: string }) => {
  return (
    <div className="container">
      <ReadMore>{text}</ReadMore>
    </div>
  );
};

export default Content;
