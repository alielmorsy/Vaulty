import React, {useRef, useState} from "react";
import {EditedAccount} from "../../typings/types";
import InputPassword from "../components";
import {Modal} from "./basicModal";


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

    onClose(data?: EditedAccount): void
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
                            disabled={inputWebsite.trim() !== ""}
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