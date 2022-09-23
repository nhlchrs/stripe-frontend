"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _config_1 = require("./config");
const mongoose_1 = require("mongoose");
const compression_1 = tslib_1.__importDefault(require("compression"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const _databases_1 = require("./databases");
const error_middleware_1 = tslib_1.__importDefault(require("./middlewares/error.middleware"));
const express_1 = tslib_1.__importDefault(require("express"));
const logger_1 = require("./utils/logger");
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.env = _config_1.NODE_ENV || 'development';
        this.port = _config_1.PORT || 3000;
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(this.port, () => {
            logger_1.logger.info(`=================================`);
            logger_1.logger.info(`======= ENV: ${this.env} =======`);
            logger_1.logger.info(`🚀 App listening on the port ${this.port}`);
            logger_1.logger.info(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    connectToDatabase() {
        if (this.env !== 'production') {
            (0, mongoose_1.set)('debug', true);
        }
        (0, mongoose_1.connect)(_databases_1.dbConnection.url, _databases_1.dbConnection.options);
    }
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)({ origin: _config_1.ORIGIN, credentials: _config_1.CREDENTIALS }));
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }
    initializeSwagger() {
        // const options = {
        //   swaggerDefinition: {
        //     info: {
        //       title: 'REST API',
        //       version: '1.0.0',
        //       description: 'Example docs',
        //     },
        //   },
        //   apis: ['swagger.yaml'],
        // };
        // const specs = swaggerJSDoc(options);
        // this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map