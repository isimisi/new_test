// Notification Form
export const CLOSE_NOTIF = 'CLOSE_NOTIF';
export const SHOW_NOTIF = 'SHOW_NOTIF';

export interface ShowNotif {
    type: typeof SHOW_NOTIF
    message: string
}

export interface CloseNotif {
    type: typeof CLOSE_NOTIF
    message: string
}

export type NotifyActions =
ShowNotif |
CloseNotif
