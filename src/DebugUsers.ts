// TypeScript file
let initDebugUsers = () => {
    if (DEBUG) {
        let arrLen = 10;
        for (let i = 0; i <= arrLen; i++) {
            Global.testUsers[i] = {
                // account: "oC7vgwEMmzdf2m77MLsJs5Ch923k",
                account: "water" + (i + 1),
                nickName: `测试${i + 1}号`,
                sex: SEX_TYPE.FEMALE,
            } 
        }
    } else {
        let arrLen = 10;
        for (let i = 0; i <= arrLen; i++) {
            Global.testUsers[i] = {
                account: "release" + (i + 1),
                nickName: `测试${i + 1}号`,
                sex: SEX_TYPE.FEMALE,
            }
        }
    }
}
