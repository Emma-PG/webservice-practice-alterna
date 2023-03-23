"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 80;
const data_user = [];
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Server Running at Port ${port}`);
});
app.get("/users/all", (req, res) => {
    res.status(200).json(data_user);
});
let id = 0;
app.post("/users/create", (request, response) => {
    const { nombre } = request.body;
    const new_user = { id, nombre };
    id++;
    const name_ = data_user.find((name_) => name_.nombre === nombre);
    if (name_) {
        response.json({
            code: 404,
            error: "User already exist",
        });
    }
    else if (nombre.trim().length > 0) {
        data_user.push(new_user);
        response.json({
            code: 200,
            data: name_,
        });
    }
    else {
        response.json({
            code: 404,
            error: "User has 0 length",
        });
    }
});
app.get("/users/search/:id", (req, res) => {
    const { id } = req.params;
    const user = data_user.find((u) => u.id == Number(id));
    if (user) {
        res.json({
            code: 200,
            data: user,
        });
    }
    else {
        res.json({
            code: 404,
            data: user,
            error: "User not found",
        });
    }
});
app.put("/users/update", (req, res) => {
    res.json({
        code: 400,
        error: "Id empty",
    });
});
app.put("/users/update/:id", (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const user = data_user.find((u) => u.id === parseInt(id));
    const userByName = data_user.find((u) => u.nombre === nombre);
    if (!nombre || nombre.trim().length <= 0)
        return res.status(400).json({
            code: 400,
            error: "name empty",
        });
    if (!user)
        return res.status(400).json({
            code: 400,
            error: "user not found",
        });
    if (userByName)
        if (userByName.nombre === nombre && userByName.id !== Number(id))
            return res.status(400).json({
                code: 400,
                error: `${nombre} is already in use`,
            });
    user.nombre = nombre;
    res.json({
        code: 200,
        data: user,
    });
});
app.delete("/users/delete/:nombre", (req, res) => {
    const { nombre } = req.params;
    const user = data_user.find((_user) => _user.nombre == nombre);
    if (user) {
        res.json(`${nombre} fue borrado`);
        res.json(data_user.splice(data_user.indexOf(user), 1));
    }
    else {
        res.json({
            code: 404,
            error: "Not found",
        });
    }
});
//# sourceMappingURL=index.js.map