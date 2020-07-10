// export interface UserData {
//     count: number,
//     list: Array<{
//         uid: number,
//         nickname: string,
//         register_time: string
//     }>
// }

// export interface UserList {
//     uid: number,
//     nickname: string,
//     register_time: string
// }
// export interface UserRequest {
//     id: number,
//     nickname: string,
//     start_time: string,
//     end_time: string
// }

export interface TableConfig {
    pageIndex: number,
    pageSize: number,
}

export interface TableData {
    count: number,
    list: []
}