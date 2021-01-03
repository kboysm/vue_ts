import { auth } from "@/plugins/firebase";
export default class AuthHandler {
    constructor() {
        this.run();
    }
    run() {
        auth.onAuthStateChanged(user => {
            if (user)
                console.log('new user');
            else
                console.log('user null');
            console.log(user);
        });
    }
    static instance() {
        if (this.inst)
            return this.inst;
        return new AuthHandler();
    }
}
//# sourceMappingURL=auth.js.map