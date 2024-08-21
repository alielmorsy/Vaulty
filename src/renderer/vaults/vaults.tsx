import React, {useState} from "react";
import {FaEdit, FaLock, FaLockOpen} from "react-icons/fa";
import {PasswordModal} from "../modals/modals";
import {useNavigate} from "react-router-dom";

const Vaults = () => {
    const [openModalDialog, setOpenModalDialog] = useState(false)
    const navigate = useNavigate();
    const onClose = (password?: string) => {
        console.log(password)
        if (password) {
            navigate("/vault/1")
        } else {
            setOpenModalDialog(false)
        }
    }
    return <>
        {openModalDialog &&
            <PasswordModal header={"Password Required to Access Vault 1"}
                           onClose={(p) => onClose(p)}/>

        }
        <div className="flex flex-col w-full p-6 bg-gray-900">
            <h2 className="text-3xl font-bold text-gray-100 mb-6 border-b border-gray-700 pb-4">
                Your Vaults
            </h2>
            <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
                <thead className="bg-gray-700">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Created Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">

                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        State
                    </th>
                </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                <tr className="hover:bg-gray-700 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm font-medium text-gray-200">
                        Vault 1
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-200">
                        {new Date().toUTCString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                        <button
                            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={() => setOpenModalDialog(true)}
                        >
                            <FaEdit className="mr-2"/> Edit
                        </button>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                        <FaLock className="text-xl text-gray-200 mr-2"/>
                    </td>
                </tr>
                <tr className="hover:bg-gray-700 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm font-medium text-gray-200">
                        Jane Smith
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-200">
                        {new Date().toUTCString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                        <button
                            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <FaEdit className="mr-2"/> Edit
                        </button>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                        <FaLock className="text-xl text-gray-200 mr-2"/>
                    </td>
                </tr>
                <tr className="hover:bg-gray-700 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm font-medium text-gray-200">
                        Sam Wilson
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-200">
                        {new Date().toUTCString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                        <button
                            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <FaEdit className="mr-2"/> Edit
                        </button>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                        <FaLockOpen className="text-xl text-gray-200 mr-2"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    </>
}
export default Vaults