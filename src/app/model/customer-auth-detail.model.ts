export interface CustomerAuthDetail {
    aid: number,
    start_time: string,
    end_time: string,
    remarks: string,
    result: number,
    real_name: string,
    card_no: string,
    uid: number,
    nickname: string,
    face: string,
    front: string,
    back: string
}
enum AuthType {
    authAccept = 'authAccept',
    authDecline = 'authDecline',
    authPending = 'authPending'
}
export interface Modal {
    modalToggle: boolean;
    modalAuthType: AuthType;
    authTitle: string;
}