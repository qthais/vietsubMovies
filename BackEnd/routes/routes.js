const { protectRoute } = require("../middleware/protectRoute");
const authRoutes = require("./auth.route");
const movieRoutes = require("./movie.route");
const tvRoutes = require("./tv.route");
const searchRoutes = require("./search.route");
const userRoutes = require("./user.route");
const apicache = require("apicache");
const cache = apicache.middleware;
const configCache= cache("10 minutes",(req,res)=>{
  if(req.method==='GET'){
    return res.statusCode===200
  }
  return false
})
function Routes(app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/movie", protectRoute, configCache, movieRoutes);
  app.use("/api/tv", protectRoute, tvRoutes);
  app.use("/api/search", protectRoute, configCache, searchRoutes);
  app.use("/api/user", protectRoute, configCache, userRoutes);
}
module.exports = Routes;
