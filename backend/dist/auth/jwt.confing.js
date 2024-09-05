"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: 'your_jwt_secret_key',
};
exports.jwtConfig = {
    secret: exports.jwtConstants.secret,
    signOptions: {
        expiresIn: '60m',
    },
};
//# sourceMappingURL=jwt.confing.js.map