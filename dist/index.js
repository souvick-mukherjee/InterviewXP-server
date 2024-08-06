"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connections_1 = require("./connections");
const user_1 = __importDefault(require("./routes/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT, 10) || 3000;
(0, connections_1.connectMongoDB)(process.env.MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app.use(express_1.default.json());
    app.use('/api/user', user_1.default);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
});
