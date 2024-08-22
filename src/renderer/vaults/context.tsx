import React, {createContext, ReactNode, useContext, useEffect, useMemo, useReducer, useState} from "react";
import {
    AccountAction,
    AccountContextType,
    AccountInfo,
    AccountsInfo,
    EditedAccount,
    UseAccountsReturnType
} from "@typings/types";



export const AccountContext = createContext<AccountContextType | null>(null);


interface AccountsContextProviderProps {
    id: number
    children: ReactNode;
}


export const AccountContextProvider: React.FC<AccountsContextProviderProps> = ({children, id}) => {
    //That's not an error. It just webstorm is going crazy
    const [accounts, dispatch] = useReducer<React.Reducer<AccountsInfo, AccountAction>>(vaultHandler, [] as AccountsInfo);
    useEffect(() => {
        //TODO: Get values
        const emails: AccountsInfo = originalAccounts
        dispatch({type: 'SET_ACCOUNTS', payload: emails})
    }, [])
    console.log(accounts)
    return <AccountContext.Provider value={{accounts, dispatch}}>
        {children}
    </AccountContext.Provider>
}

const vaultHandler = (accounts: AccountsInfo, action: AccountAction): AccountsInfo => {
    //TODO: These will be done through APIs.
    switch (action.type) {
        case "SET_ACCOUNTS":
            return action.payload
        case "ADD_ACCOUNT":
            const payload = action.payload
            const id = accounts[accounts.length - 1].id + 1
            const newAccount = {...payload, id: id} as AccountInfo
            return [...accounts, newAccount]
        case "REMOVE_ACCOUNT":
            return accounts.filter((account) => account.id !== action.id)
        case "EDIT_ACCOUNT":
            const editedAccount: EditedAccount = action.payload
            const index = accounts.findIndex(item => item.id === action.id)

            if (index == -1) {
                return accounts
            }
            return [
                ...accounts.slice(0, index),
                {id: action.id, ...editedAccount},
                ...accounts.slice(index + 1)
            ] as AccountInfo[]
        default:
            break
    }
    return [...accounts];
}

export const useAccounts = (): UseAccountsReturnType => {
    const context = useContext(AccountContext)
    if (!context) {
        throw new Error("Using Account Context in the wrong place.")
    }
    return [context.accounts, context.dispatch]
}

type AccountsSearchType = [AccountsInfo, (search: string) => void]
export const useAccountSearch = (accounts: AccountsInfo): AccountsSearchType => {
    const [filterAccounts, setFilteredAccounts] = useState(accounts)
    useEffect(() => {
        setFilteredAccounts(accounts);
    }, [accounts]);
    const searchCallback = useMemo(() => {
        return (text: string) => {
            const temp = accounts.filter(account => account.email.toLowerCase().includes(text.toLowerCase())
                || account.website.toLowerCase().includes(text.toLowerCase()))
            setFilteredAccounts(temp)
        }
    }, [accounts])
    return [filterAccounts, searchCallback]
}

let originalAccounts: AccountsInfo = [
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