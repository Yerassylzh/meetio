import React, { useEffect, useRef } from "react";
import "./styles/Modal.css";
import ReactPortal from "@/components/ReactPortal";
import { CSSTransition } from "react-transition-group";

function Modal({
  children,
  title,
  isOpen,
  handleClose,
}: {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  handleClose: () => void;
}) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={isOpen}
        timeout={{ enter: 0, exit: 300 }}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}
      >
        <div className="modal" ref={nodeRef}>
          <div className="modal-content">
            <div className="w-full flex justify-between items-center pb-[10px]">
              <div className="font-medium text-[20px] pl-[5px]">{title}</div>
              <button
                onClick={() => handleClose()}
                className="close-btn hover:cursor-pointer"
              >
                <XIcon />
              </button>
            </div>
            {children}
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}

export default Modal;

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M15 5L5 15M5 5L15 15"
        stroke="#99A1AF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
