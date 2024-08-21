import React, {ReactNode} from "react";
import {createPortal} from "react-dom";
import {IoMdClose} from "react-icons/io";
import {ModalRole} from "../types";


interface ButtonProps {
    onClick: () => void;
    className: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({onClick, className, children}) => (
    <button
        className={`focus:outline-none ${className}`}
        type="button"
        onClick={onClick}
    >
        {children}
    </button>
);


interface ButtonsProps {
    role: ModalRole;
    onCancel?: () => void;
    onClose?: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({role, onCancel, onClose}) => {
    const buttonConfig = {
        "enter-cancel": (
            <>
                <Button
                    onClick={() => onCancel ? onCancel() : null}
                    className="text-red-500 hover:text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => onClose ? onClose() : null}
                    className="bg-blue-500 hover:bg-blue-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                    Enter
                </Button>
            </>
        ),
        "cancel": (
            <Button
                onClick={() => onCancel ? onCancel() : null}
                className="border border-gray-400 text-white hover:bg-gray-700 px-4 py-2 rounded-md"
            >
                Cancel
            </Button>
        ),
        "ok-cancel": (
            <>
                <Button
                    onClick={() => onCancel ? onCancel() : null}
                    className="border border-gray-400 text-white hover:bg-gray-700 px-4 py-2 rounded-md mr-2"
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => onClose ? onClose() : null}
                    className="bg-blue-800 text-white hover:bg-blue-900 px-4 py-2 rounded-md"
                >
                    Okay
                </Button>
            </>
        ),
        "save-cancel": (
            <>
                <Button
                    onClick={() => onCancel ? onCancel() : null}
                    className="border border-gray-400 text-white hover:bg-gray-700 px-4 py-2 rounded-md mr-2"
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => onClose ? onClose() : null}
                    className="bg-blue-800 text-white hover:bg-blue-900 px-4 py-2 rounded-md"
                >
                    Save
                </Button>
            </>
        ),
        "yes-no": (
            <>
                <Button
                    onClick={() => onCancel ? onCancel() : null}
                    className="bg-red-700 text-white hover:bg-red-800 px-4 py-2 rounded-md mr-2"
                >
                    No
                </Button>
                <Button
                    onClick={() => onClose ? onClose() : null}
                    className="bg-blue-800 text-white hover:bg-blue-900 px-4 py-2 rounded-md"
                >
                    Yes
                </Button>
            </>
        )
    };

    return buttonConfig[role];
};


interface ModalProps {
    children?: ReactNode
    role?: ModalRole
    header?: string

    onClose?(): void

    onCancel?(): void
}


export const Modal: React.FC<ModalProps> = ({children, role = "cancel", header, onClose, onCancel}) => {

    return createPortal(<div id={"modal"}>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none origin-center animate-modal-open delay-300">
                <div className="relative w-auto my-6 mx-auto max-w-3xl bg-gray-800 ">
                    {/*content*/}
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="justify-between p-5 border-b border-solid border-gray-700 rounded-t  text-center">
                            <h3 className="text-2xl font-semibold text-gray-200 mr-4">
                                {header}
                            </h3>
                            <button
                                className="absolute top-1 right-0.5 p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => onCancel ? onCancel() : null}
                            >
                                <IoMdClose
                                    className="bg-transparent text-gray-300 h-6 w-6 text-2xl block outline-none focus:outline-none"/>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            {children}
                        </div>
                        {/*footer*/}

                        <div
                            className="flex items-center justify-end p-6 border-t border-solid border-gray-700 rounded-b">
                            <Buttons role={role} onCancel={onCancel} onClose={onClose}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>

        </div>
        , document.body)
}
