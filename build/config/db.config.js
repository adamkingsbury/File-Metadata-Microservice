"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _env = require("./env.json");

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DBConfig = function () {
  function DBConfig() {
    _classCallCheck(this, DBConfig);
  }

  _createClass(DBConfig, null, [{
    key: "init",
    value: function init() {

      var URL = _env2.default.NODE_ENV === "production" ? _env2.default.MONGO_URI : _env2.default.MONGO_URI;

      _mongoose2.default.Promise = _bluebird2.default;
      _mongoose2.default.connect(URL, { useMongoClient: true });
      _mongoose2.default.connection.on("error", console.error.bind(console, "An error ocurred with the DB connection: "));
    }
  }]);

  return DBConfig;
}();

exports.default = DBConfig;
;
//# sourceMappingURL=db.config.js.map