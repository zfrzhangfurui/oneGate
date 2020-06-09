export interface SingleWork extends AuditList {
    // auditlist: {
    //     username?: string,
    //     audittime?: string,
    //     check_state?: number,
    //     description?: string
    // }[],
    // auditlist: Array<{
    //     username?: string,
    //     audittime?: string,
    //     check_state?: number,
    //     description?: string
    // }>
    baseinfo: {
        check_state?: number,
        name?: string,
        type?: number,
        state?: number,
        file?: string,
        file_size?: number,
        updatetime?: number,
        copyright?: number,
        cover?: string,
        tag?: [],
        assets?: [],
        author_id?: number,
        author_name?: string,
        like_count?: number,
        collect_count?: number,
        share_count?: number,
        description?: string,
        license?: number,
        price?: string,
        attribute?: number,
        createtime?: number,
        publishtime?: number
    }
}
export interface AuditList {
    auditlist: {
        username?: string,
        audittime?: string,
        check_state?: number,
        description?: string
    }[],
}



