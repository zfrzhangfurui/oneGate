export interface UserDetail {
    base_info: {
        uid: number,
        nickname: string,
        register_time: string,
        email: string,
        phone: string,
        wallet: string,
        balance: number,
        authentication_result: number
    },
    state: {
        user_status: number,
        day: number,
        start_time: string,
        end_time: string,
        description: string
    },
    identity: {
        realname: string,
        cardno: number
    }
}