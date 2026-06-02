const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  const accessToken = bearerToken || req.session.authorization?.accessToken;

  if (!accessToken) {
    return res.status(403).json({message: "User is not authenticated."});
  }

  jwt.verify(accessToken, "access", (err, user) => {
    if (err) {
      return res.status(403).json({message: "Invalid or expired token."});
    }
    req.user = user;
    next();
  });
});
 
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
