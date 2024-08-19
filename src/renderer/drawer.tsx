import React from "react";
import {PiVaultFill} from "react-icons/pi";
import {IoIosDocument, IoMdSettings} from "react-icons/io";
import logo from "@assets/rage.png"
import {MdBackup} from "react-icons/md";
import {useLocation} from "react-router-dom";



interface DrawerProps {
    open: boolean

    setOpen(open: boolean): void
}

interface DrawerRowProps {
    title: string
    open?: boolean
    icon: React.ReactNode
    link: string
    active?: boolean
}

const DrawerRow: React.FC<DrawerRowProps> = ({title, icon, open = true, link, active = false}) => {
    let className;
    if (active) {
        className = "flex p-2 rounded-lg dark:text-white bg-gray-700 group"
    } else {
        className = "flex p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    }
    return (
        <li className={"mt-4"}>
            <a href={link}
               className={className}>
                {icon}
                {open && <span className="ms-3">{title}</span>}

            </a>
        </li>)
}
const Vault = (props: any) => {
    const className = props.className
    return <>
        <PiVaultFill className={className + ' z-40 vault'} size={24}/>
        <IoIosDocument
            className={className + ' z-0 absolute vault-shadow group-hover mt-0.5 ml-0.5  group-hover:opacity-25'}
            size={20}/>
        {/*<span className={'w-4 h-4 bg-gray-800  left-4 mt-1  z-0'}/>*/}

    </>
}
//<span
//                             className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
const Drawer: React.FC<DrawerProps> = ({open, setOpen}) => {
    const location = useLocation()
    let drawerClasses: string
    if (open) {
        drawerClasses = `h-screen overflow-y-hidden  bg-white dark:bg-gray-800 text-white transition-all duration-300 ease-in-out w-64 pt-4 px-1`;
    } else {
        drawerClasses = `flex flex-col items-center m-auto bg-white dark:bg-gray-800 text-white transition-all duration-300 ease-in-out w-16`;
    }
    const iconClassName = "flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
    return <div className={open ? "" : "flex h-screen align-middle"}>
        <div className={drawerClasses} tabIndex={-1}>
            <div className={"flex justify-between"}>
                <div className="flex align-bottom mt-2">
                    <img className={"cursor-pointer"} src={logo} width={32} height={32} alt={"logo"}
                         onClick={() => setOpen(!open)}/>
                    {open &&
                        <h5 id="drawer-disable-body-scrolling-label  ml-"
                            className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400 ml-2">Menu</h5>
                    }
                </div>
                {open &&
                    <button type="button" onClick={() => setOpen(false)}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>
                }
            </div>


            <div className="py-4 overflow-y-hidden h-full flex flex-col">
                <ul className="font-medium">
                    <DrawerRow link={"/vaults"} icon={<Vault className={iconClassName}/>} title={"Your Vaults"}
                               active={location.pathname.includes("vault")}
                               open={open}/>
                    <DrawerRow link={""}
                               icon={<MdBackup className={iconClassName + ' group-hover:animate-bounce-once'}
                                               size={24}/>}
                               title={"Backup"} open={open}/>
                    <DrawerRow link={""}
                               icon={<IoMdSettings className={iconClassName + ' dark:group-hover:animate-spin-once'}
                                                   size={24}/>}
                               title={"Settings"}
                               open={open}/>

                </ul>
                {open &&
                    <span className={"px-4 my-3 border-b-1 w-full block h-0.5 bg-gray-700"}/>
                }


            </div>
        </div>
    </div>
}
export default Drawer;
