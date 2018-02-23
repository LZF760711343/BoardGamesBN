// TypeScript file
var initDebugUsers = function () {
    if (true) {
        var arrLen = 10;
        for (var i = 0; i <= arrLen; i++) {
            Global.testUsers[i] = {
                // account: "oC7vgwEMmzdf2m77MLsJs5Ch923k",
                account: "water" + (i + 1),
                nickName: "\u6D4B\u8BD5" + (i + 1) + "\u53F7",
                sex: 2 /* FEMALE */,
            };
        }
    }
    else {
        var arrLen = 10;
        for (var i = 0; i <= arrLen; i++) {
            Global.testUsers[i] = {
                account: "release" + (i + 1),
                nickName: "\u6D4B\u8BD5" + (i + 1) + "\u53F7",
                sex: 2 /* FEMALE */,
            };
        }
    }
};
//# sourceMappingURL=DebugUsers.js.map