import React, {useMemo, useState} from "react";
import {AccountInfo, Dict, EditedAccount} from "../../typings/types";
import {CiSearch} from "react-icons/ci";
import {BiSolidHide, BiSolidShow} from "react-icons/bi";
import {BsClipboardCheckFill} from "react-icons/bs";
import {IoClipboardSharp} from "react-icons/io5";
import {AccountModal, YesNoModal} from "../modals/modals";
import {MdDelete} from "react-icons/md";
import {IoMdAdd, IoMdClose, IoMdCreate} from "react-icons/io";
import {AccountContextProvider, useAccounts, useAccountSearch} from "./context";
import {useParams} from "react-router-dom";

let originalItems: Array<Dict> = [
    {id: 1, website: "www.github.com", email: "asdfw@gmail.com", password: "123456789"},
    {id: 2, website: "www.google.com", email: "asdfw@gmail.com", password: "123456789"},
    {id: 3, website: "www.google.com", email: "ali.elmorsy@gmail.com", password: "123456789"},
    {id: 4, website: "www.github.com", email: "asdfw@gmail.com", password: "123456789"},
    {id: 5, website: "www.google.com", email: "asdfw@gmail.com", password: "123456789"},
    {id: 6, website: "www.google.com", email: "ali.elmorsy@gmail.com", password: "123456789"},
    {id: 7, website: "www.github.com", email: "asdfw@gmail.com", password: "123456789"},
    {id: 8, website: "www.google.com", email: "asdfw@gmail.com", password: "123456789"},
    {id: 9, website: "www.google.com", email: "ali.elmorsy@gmail.com", password: "123456789"},
]

interface PasswordCardRowProps {
    keyName: string
    value: String
    isHidden: boolean
}


const PasswordCardRow: React.FC<PasswordCardRowProps> = ({keyName, value, isHidden}) => {

    const [shown, setShown] = useState(!isHidden)
    const [copied, setCopied] = useState(false)
    const originalValue = value;
    if (isHidden && !shown) {
        value = "*".repeat(16)
    }
    const onCopy = useMemo(() => {
        return () => {
            navigator.clipboard.writeText(originalValue.toString()).then(r => setCopied(true))
        }
    }, [originalValue])
    return <div className="flex items-center justify-between ">
        <p className="flex items-center">
            <span className="font-semibold text-xl mr-1">{keyName}:</span>
            <span className={`text-sm text-gray-400 ${shown ? '' : "pt-2"}`}>{value}</span>
        </p>
        <div className="flex items-center space-x-2">
            {isHidden && <button
                className="text-gray-400 hover:text-white transition duration-150"
                onClick={() => setShown(!shown)}
            >
                {shown ?
                    <BiSolidShow size={16}/>
                    :
                    <BiSolidHide size={16}/>
                }
            </button>
            }
            <button
                className="text-gray-400 hover:text-white transition duration-150"
                onClick={onCopy}>
                {copied ? <BsClipboardCheckFill size={16}/> :
                    <IoClipboardSharp size={16}/>
                }

            </button>
        </div>
    </div>
}


interface AccountCardProps {
    className?: string
    info: AccountInfo

    onDelete(id: number): void

}

const AccountCard: React.FC<AccountCardProps> = ({className = "", info, onDelete}) => {

    const [showEditDialog, setShowEditDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const [accounts, updateAccounts] = useAccounts()
    const onEditDone = (editedAccount?: EditedAccount) => {
        setShowEditDialog(false)
        if (editedAccount) {
            updateAccounts({type: "EDIT_ACCOUNT", id: info.id, payload: editedAccount})
        }
    }

    const onDeleteOperation = () => {
        onDelete(info.id)
        setShowDeleteDialog(false)
    }
    const addBorder = showEditDialog || showDeleteDialog
    return (
        <>
            {showEditDialog &&
                <AccountModal inputWebsite={info.website.toString()} inputEmail={info.email.toString()}
                              inputPassword={info.password.toString()} onClose={onEditDone}/>
            }
            {showDeleteDialog &&
                <YesNoModal title={"Are you sure you want to remove"} onClose={onDeleteOperation}
                            onCancel={() => setShowDeleteDialog(false)}>
                    <div className={"flex w-full h-full"}>
                        <MdDelete className={"text-gray-600"} size={36}/>
                        <p className={"mt-1 ml-2 text"}>Are you sure you want to delete
                            <span className={"pl-1 font-bold text-gray-200"}>{info.email}</span>
                        </p>
                    </div>
                </YesNoModal>
            }
            <div
                className={`${className} max-w-sm p-6 bg-gray-800 border border-gray-600 rounded-md shadow-md ${showDeleteDialog ? "animate-tilt-shaking" : ""} ${addBorder ? "border border-solid border-white" : ""}`}>
                <div className="flex flex-col text-gray-300 space-y-4">
                    <div className="flex flex-col text-gray-300 space-y-4">

                        <PasswordCardRow keyName={"Website"} value={info.website.toString()} isHidden={false}/>
                        <PasswordCardRow keyName={"Username"} value={info.email.toString()} isHidden={false}/>
                        <PasswordCardRow keyName={"Password"} value={info.password.toString()} isHidden={true}/>

                    </div>
                    <div className="flex justify-end">
                        <button
                            className="flex items-center text-sm bg-red-700 text-white hover:bg-red-800 rounded-md mt-1 px-2 py-2 transition duration-150 mr-2"
                            onClick={() => setShowDeleteDialog(true)}
                        >
                            <IoMdClose size={14} className="mr-2"/>
                            Delete
                        </button>
                        <button
                            className="flex items-center bg-blue-600 text-white text-sm hover:bg-blue-700 rounded-md mt-1 px-3 py-2 transition duration-150"
                            onClick={() => setShowEditDialog(true)}>
                            <IoMdCreate size={14} className="mr-2"/>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const AddAccountButton: React.FC = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [accounts, updateAccounts] = useAccounts()
    const onAddDone = (editedAccount?: EditedAccount) => {
        setShowAddModal(false)
        if (editedAccount) {
            updateAccounts({type: "ADD_ACCOUNT", payload: editedAccount})
        }
    }
    return <>
        {showAddModal &&
            <AccountModal onClose={onAddDone}/>
        }
        <div>
            <button
                className="flex items-center text-sm bg-green-700 text-white hover:bg-green-800 rounded-md px-4 py-2 transition duration-150 mr-3"
                onClick={() => setShowAddModal(true)}
            >
                <IoMdAdd size={16} className="mr-2"/>
                Add
            </button>
        </div>
    </>
}
const Vault = () => {
    const [removingPassword, setRemovingPassword] = useState<number>(-1)

    const [accounts, updateAccounts] = useAccounts()
    const [filterAccounts, searchCallback] = useAccountSearch(accounts)


    const deleteItems = (id: number) => {
        //TODO: Adjust timeout If animation time has changed.
        setRemovingPassword(id)
        setTimeout(() => {
            updateAccounts({type: "REMOVE_ACCOUNT", id: id})
            setRemovingPassword(-1)
        }, 300)

    }
    //TODO: Maybe create a context for the drawer?
    return <>
        <h2 className="text-3xl font-bold text-gray-100 mb-6 border-b border-gray-700 pb-4">
            Vault 1
        </h2>
        <div className={"flex items-center space-x-3 mb-3"}>
            <div className={"w-full h-auto mb-3"}>
                <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="default-search"
                           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <CiSearch/>
                        </div>
                        <input type="search"
                               className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Search for websites or emails"
                               onChange={(e) => searchCallback(e.target.value)} required/>
                    </div>
                </form>
            </div>
            <AddAccountButton/>
        </div>
        <div
            className={"grid grid-flow-row-dense sm:grid-cols-1 md:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 overflow-y-auto overflow-x-hidden pb-5 px-2"}>
            {filterAccounts.map((x: AccountInfo) => {
                return <AccountCard
                    className={x.id === removingPassword ? "scale-95 transition-opacity duration-300 ease-out opacity-0" : ""}
                    key={x.id} info={x}
                    onDelete={deleteItems}/>
            })}


        </div>
    </>
}
const VaultPage = () => {
    const {id} = useParams();
    if (id == null) {
        //TODO
        return <></>
    }
    const formattedId = parseInt(id)
    if (isNaN(formattedId)) {
        //TODO
        return <></>
    }

    return <AccountContextProvider id={formattedId}>
        <Vault/>
    </AccountContextProvider>
}
export default VaultPage