const express = require("express");

const routes = express();

const registerUser = require("./controllers/registerUser");

const schema = require("./schemas/registerSchema");

const { validationSchema } = require("./middlewares/validationSchema");
const loginUserSchema = require("./schemas/loginUserSchema");
const loginUser = require("./controllers/loginUser");
const { listUser, updateUser } = require("./controllers/users");
const registerCustomerSchema = require("./schemas/registerCustomerSchema");
const userSchema = require("./schemas/userSchema");
const { registerCustomer } = require("./controllers/registerCustomer");
const validationLogin = require("./middlewares/validationLogin");
const customerDetail = require("./controllers/customerDetail");

const listAllCustomers = require("./controllers/listAllCustomers");
const { updateCustomer } = require("./controllers/customers");

const listAllCharges = require("./controllers/listAllCharges");
const registerChargeSchema = require('./schemas/registerChargeSchema');
const registerCharge = require('./controllers/registerCharge');
const chargesDetail = require("./controllers/chargesDetail");
const editCharges = require("./controllers/editCharges");
const updateCharge = require("./schemas/updateChargeSchema");
const deleteCharge = require("./controllers/deleteCharge");

routes.post("/sign-up", validationSchema(schema), registerUser);
routes.post("/sign-in", validationSchema(loginUserSchema), loginUser);

routes.use(validationLogin);

routes.get("/user", listUser);
routes.put("/user", validationSchema(userSchema), updateUser);

routes.post('/charges', validationSchema(registerChargeSchema), registerCharge)
routes.get('/charges', listAllCharges);
routes.get('/charges/:id', chargesDetail);
routes.put('/charges/:id', validationSchema(updateCharge), editCharges);
routes.delete('/charges/:id', deleteCharge);

routes.get('/customer', listAllCustomers);
routes.get("/customer/detail/:id", customerDetail);
routes.post("/customer", validationSchema(registerCustomerSchema), registerCustomer);
routes.put("/customer/:id", validationSchema(registerCustomerSchema), updateCustomer);

module.exports = routes;