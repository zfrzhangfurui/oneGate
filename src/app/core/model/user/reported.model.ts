export interface TableConfig {
    pageIndex: number,
    pageSize: number,
}

export interface Config {
    reportNo: number,
    userWhoReport: string,
    userReported: string,
    reportContent: string,
    reportTimeStart: string,
    reportTimeEnd: string
}