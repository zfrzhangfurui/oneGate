export interface CustomerList {
    start_time: string,
    end_time: string,
    uid: number,
    nickname: string
}
export interface RequestList {
    count: number,
    list: Array<{
        start_time: string,
        end_time: string,
        uid: number,
        nickname: string
    }>

}
export interface tableConfig {
    p: number,
    s: number,
}

export interface CustomerAuthForm {
    uid: number,
    name: string,
    applyStartTime: Date,
    applyEndTime: Date,
    verifyStartTime: Date,
    verifyEndTime: Date
}