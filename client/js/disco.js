var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var Context = (function (_super) {
        __extends(Context, _super);
        function Context(serviceUri) {
            var config = {
                name: 'oData',
                oDataServiceHost: serviceUri,
                maxDataServiceVersion: '3.0',
                Accept: 'application/json;odata=nometadata'
            };
            _super.call(this, config);
        }
        return Context;
    })(Default.Container);
    exports.Context = Context;
    $data.EntityContext.prototype['authData'] = function () {
        return exports.AuthData();
    };
    exports.AuthData = function () {
        return ({ user: "anonymous", password: "" });
    };

    $data.EntityContext.prototype['prepareRequest'] = function (r) {
        var __encodeBase64 = $data['Authentication'].BasicAuth.BasicAuth.prototype.__encodeBase64;
        if (this.context.authData) {
            var auth = this.context.authData();
            if (auth.user != null)
                r[0].headers['Authorization'] = "Basic  " + __encodeBase64(auth.user + ':' + auth.password);
        }
    };
});
//# sourceMappingURL=disco.js.map
