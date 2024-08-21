import React from "react";

export type ModalRole = "cancel" | "enter-cancel" | "ok-cancel" | "save-cancel" | "yes-no"

export interface EditedAccount {

    [key: string]: string;
}

export interface Dict {
    id: number

    [key: string]: string | number;
}

export interface AccountInfo {
    id: number
    website: string
    email: string
    password: string

}

export type AccountAction =
    | { type: 'ADD_ACCOUNT'; payload: EditedAccount }
    | { type: 'REMOVE_ACCOUNT', id: number }
    | { type: 'EDIT_ACCOUNT', payload: EditedAccount, id: number }
    | { type: 'SET_ACCOUNTS', payload: AccountsInfo }


export type AccountContextType = {
    accounts: AccountsInfo
    dispatch: React.Dispatch<AccountAction>
}

export type AccountsInfo = AccountInfo[]
export type UseAccountsReturnType = [AccountsInfo, React.Dispatch<AccountAction>];