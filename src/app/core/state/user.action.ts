export class Login {
    static type: string = "[User] Update login";
    constructor(public account: string, public password: string) { }
}

export class Logout {
    static type: string = "[User] Update logout";
    constructor() { }
}

// export class Register {
//     static type: string = "[User] Update register";
//     constructor(public account: string, public password: string, public verify_code: string) { }
// }

// export class UpdatePublicInformation {
//     static type: string = "[User] Update public information";
//     constructor(public nickname: string, public description: string,public avatar?: Blob) { }
// }

export class FetchMe {
    static type: string = "[User] Fetch";
    constructor() { }
}