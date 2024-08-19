import React, {ReactNode, useRef, useState} from "react";
import {IoMdClose} from "react-icons/io";
import {createPortal} from 'react-dom';
import {BiSolidHide, BiSolidShow} from "react-icons/bi";
import {Dict, EditAccountDict} from "./types";
import InputPassword from "./components";

type ModalRole = "cancel" | "enter-cancel" | "ok-cancel" | "save-cancel" | "yes-no"


interface ModalProps {
    children?: ReactNode
    role?: ModalRole
    header?: string

    onClose?(): void

    onCancel?(): void
}


export const Modal: React.FC<ModalProps> = ({children, role = "cancel", header, onClose, onCancel}) => {
    let buttons: React.ReactNode
    if (role === "enter-cancel") {
        buttons = (
            <>
                <button
                    className="text-red-500 hover:text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onCancel ? onCancel() : null}
                >
                    Cancel
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onClose ? onClose() : null}>
                    Enter
                </button>
            </>
        )
    } else if (role === "cancel") {
        buttons = <button className="border border-gray-400 text-white hover:bg-gray-700 px-4 py-2 rounded-md"
                          onClick={() => onCancel ? onCancel() : null}>
            Cancel
        </button>
    } else if (role === "ok-cancel") {
        buttons = (
            <>
                <button className="border border-gray-400 text-white hover:bg-gray-700 px-4 py-2 rounded-md mr-2"
                        onClick={() => onCancel ? onCancel() : null}>
                    Cancel
                </button>
                <button className="bg-blue-800 text-white hover:bg-blue-900 px-4 py-2 rounded-md"
                        onClick={() => onClose ? onClose() : null}>
                    Okay
                </button>


            </>
        )
    } else if (role === "save-cancel") {
        buttons = (
            <>
                <button className="border border-gray-400 text-white hover:bg-gray-700 px-4 py-2 rounded-md mr-2"
                        onClick={() => onCancel ? onCancel() : null}>
                    Cancel
                </button>
                <button className="bg-blue-800 text-white hover:bg-blue-900 px-4 py-2 rounded-md"
                        onClick={() => onClose ? onClose() : null}>
                    Save
                </button>


            </>
        )
    } else if (role === "yes-no") {
        buttons = (
            <>
                <button className="bg-red-700 text-white hover:bg-red-800 px-4 py-2 rounded-md mr-2"
                        onClick={() => onCancel ? onCancel() : null}>
                    No
                </button>
                <button className="bg-blue-800 text-white hover:bg-blue-900 px-4 py-2 rounded-md"
                        onClick={() => onClose ? onClose() : null}>
                    Yes
                </button>


            </>
        )
    }
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
                            {buttons}
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>

        </div>
        , document.body)
}

interface YesNoModalProps {
    title: string
    children: React.ReactNode

    onCancel?(): void

    onClose?(): void
}


export const YesNoModal: React.FC<YesNoModalProps> = ({title, children, onCancel, onClose}) => {
    return <Modal header={title} role={"yes-no"} onCancel={onCancel} onClose={onClose}>
        <div className={"text-center text-gray-200"}>
            {children}
        </div>
    </Modal>
}

interface PasswordModalProps {
    onClose(password?: string): void

    header?: string
}

export const PasswordModal: React.FC<PasswordModalProps> = ({onClose, header = ""}) => {
    const passwordRef = useRef<HTMLInputElement>(null)
    return <Modal onClose={() => onClose(passwordRef.current?.value)} role={"enter-cancel"} header={header}
                  onCancel={onClose}>
        <form className={"max-w-sm mx-auto"}>
            <div className={"mb-5"}>
                <label htmlFor="email"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <InputPassword inputRef={passwordRef}/>
            </div>
        </form>
    </Modal>
}

interface AccountModalProps {
    inputWebsite?: string
    inputEmail?: string
    inputPassword?: string

    onClose(data?: EditAccountDict): void
}

export const AccountModal: React.FC<AccountModalProps> = ({
                                                              inputWebsite = "",
                                                              inputEmail = "",
                                                              inputPassword = "",
                                                              onClose
                                                          }) => {
    const [somethingChanged, setSomethingChanged] = useState(false);
    const [website, setWebsite] = useState(inputWebsite);
    const [email, setEmail] = useState(inputEmail);
    const [password, setPassword] = useState(inputPassword);


    const [withCancelDialog, setWithCancelDialog] = useState(false)


    const title = inputWebsite === "" ? "Add New Account" : "Edit Account"

    const onCancel = () => {
        if (!somethingChanged) {
            onClose()
            return
        }
        setWithCancelDialog(true)
    }

    return <>
        {withCancelDialog &&
            <YesNoModal title={"Are you sure you want to cancel"} onClose={onClose}
                        onCancel={() => setWithCancelDialog(false)}>
                You have unsaved edits are you sure you want to cancel.
            </YesNoModal>
        }

        <Modal header={title} role={"save-cancel"} onCancel={onCancel}
               onClose={() => onClose({website: website, email: email, password: password})}>
            <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
                <form onSubmit={(e) => e.preventDefault()}
                      className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
                    {/* Website Label */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="website">
                            Website
                        </label>
                        <input
                            type="text"
                            id="website"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-600 disabled:bg-gray-600 disabled:border-0"
                            value={website}
                            onChange={(e) => {
                                setWebsite(e.target.value);
                                setSomethingChanged(true)
                            }}
                            placeholder="Enter accoicated website"
                            disabled
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-600"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setSomethingChanged(true)
                            }}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password Input */}

                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <InputPassword value={password} onChange={
                            (e) => {
                                setPassword(e.target.value)
                                setSomethingChanged(true)
                            }}/>
                    </div>

                </form>
            </div>
        </Modal>
    </>
}