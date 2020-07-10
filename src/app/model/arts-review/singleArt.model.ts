export interface SingleWorkv1 extends AuditListv1 {
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
export interface AuditListv1 {
    auditlist: {
        username?: string,
        audittime?: string,
        check_state?: number,
        description?: string
    }[],
}

export interface SingleWork extends SingleWorkAssets, SingleWorkGoods {
    name: string,
    category: number,
    file: string,
    file_size: number,
    copyright: number,
    tag: string,
    auditstate: number,
    author_id: number,
    author_name: string,
    description: string,
    time: string,
    audituserid?: number,
    auditusername?: string,
    auditresult?: string,
    audittime?: number,
    tagArray: string[]
}

export interface SingleWorkAssets {
    assets: {
        author_id: number,
        author_name: string,
        description: string,
        time: string
    }[]
}
export interface SingleWorkGoods {
    goods: {
        id: number,
        name: string,
        maxstock: number,
        price: number,
        file: string
    }[]
}

export interface ContentChangeRouteList {
    name: boolean,
    category: boolean,
    file: boolean,
    file_size: boolean,
    copyright: boolean,
    tag: boolean,
    auditstate: boolean,
    author_id: boolean,
    author_name: boolean,
    description: boolean,
    assets?: [boolean?],
    goods?: Array<boolean[]>
}

export interface CooperationInfo {
    workid: string,
    name: string,
    cover: string,
    category: string,
    publishtime: string,
    share: string,
    uid: string,
    username: string,
    state: number
}

export enum Modal {
    auditAccepted = 'auditAccepted',
    auditDeclined = 'auditDeclined',
    cancelPublish = 'modalCancelPublish',
    displayImage = 'displayImage'
}