import {GET_VAULTS, REQUEST_VAULT_ACCESS, EDIT_ACCOUNT, REMOVE_ACCOUNT, ADD_ACCOUNT} from "@main/channels";

import {EditedAccount} from "@typings/types";

const {ipcRenderer} = require('electron/renderer')


export const vaultPreload = {
    getVaults: () => ipcRenderer.send(GET_VAULTS),
    requestAccess: (id: number) => ipcRenderer.send(REQUEST_VAULT_ACCESS),

}
export const vaultAccountManager = {
    deleteAccount: (id: number) => ipcRenderer.send(REMOVE_ACCOUNT, id),
    editAccount: (id: number, editedInfo: EditedAccount) => ipcRenderer.send(EDIT_ACCOUNT, id, editedInfo),
    addAccount: (editedInfo: EditedAccount) => ipcRenderer.send(ADD_ACCOUNT, editedInfo)
}