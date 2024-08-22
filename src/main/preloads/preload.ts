import {contextBridge} from 'electron';
import {vaultAccountManager, vaultPreload} from "./vaultPreload";

contextBridge.exposeInMainWorld("vault", {
    ...vaultPreload,
    manager: vaultAccountManager
})