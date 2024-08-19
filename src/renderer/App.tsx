import React, {useMemo, useState} from 'react';

import Drawer from "./drawer";
import {Outlet} from "react-router-dom";





// function App() {
//
//     const [open, setOpen] = useState(true)
//
//     const [items, setItems] = useState(originalItems)
//
//     const updateItems = (value: string) => {
//         value = value.trim().toLowerCase()
//         if (value === "") {
//             setItems(originalItems)
//             return
//         }
//         const temp = items.filter(item => item.website.toString().toLowerCase().includes(value) || item.email.toString().toLowerCase().includes(value))
//         setItems(temp)
//     }
//     const deleteItems = (id: number) => {
//         setItems(items.filter(item => item.id !== id))
//     }
//     const editItem = (id: number, editedInfo: EditAccountDict) => {
//         console.log("I AM HERE")
//         const temp = items.map(info => {
//             if (info.id === id) {
//                 return {...info, ...editedInfo}
//             }
//             return info
//         })
//         setItems(temp)
//
//     }
//     return (
//         <div className="flex h-screen">
//             <Drawer open={open} setOpen={setOpen}/>
//             <div className="flex flex-col w-full p-6 bg-gray-900 overflow-y-auto">
//                 <h2 className="text-3xl font-bold text-gray-100 mb-6 border-b border-gray-700 pb-4">
//                     Vault 123
//                 </h2>
//                 <div className={"w-full h-auto mb-3"}>
//                     <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
//                         <label htmlFor="default-search"
//                                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
//                         <div className="relative">
//                             <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                                 <CiSearch/>
//                             </div>
//                             <input type="search" id="default-search"
//                                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                    placeholder="Search for websites or emails"
//                                    onChange={(e) => updateItems(e.target.value)} required/>
//                         </div>
//                     </form>
//                 </div>
//                 <div
//                     className={"grid grid-flow-row-dense md:grid-col-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 2xl:grid-cols-4"}>
//                     {items.map((x, i) => {
//                         return <PasswordCard key={x.id} info={x} onDelete={deleteItems}
//                                              onEdit={editItem}/>
//                     })}
//
//
//                 </div>
//             </div>
//         </div>
//     )
//
// }

const App = () => {
    const [isDrawerOpened, setIsDrawerOpened] = useState(true)
    return <div className="flex h-screen">
        <Drawer open={isDrawerOpened} setOpen={setIsDrawerOpened}/>
        <div className="flex flex-col w-full p-6 bg-gray-900 overflow-y-auto">
            <Outlet/>
        </div>
    </div>
}
export default App
export const Home = () => {
    return <div className={"text-center h-screen text-gray-200 m-auto"}>

        Did you know that horses cannot fly.
    </div>
}

/*
# Table with modal


 */