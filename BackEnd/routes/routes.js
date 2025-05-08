const { protectRoute } = require("../middleware/protectRoute");
const authRoutes = require("./auth.route");
const movieRoutes = require("./movie.route");
const tvRoutes = require("./tv.route");
const searchRoutes = require("./search.route");
const userRoutes = require("./user.route");
const apicache = require("apicache");
const onlyStatus200 = (req, res) => res.statusCode === 200
const cache = apicache.middleware;
function Routes(app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/movie", protectRoute, cache("10 minutes",onlyStatus200), movieRoutes);
  app.use("/api/tv", protectRoute, tvRoutes);
  app.use("/api/search", protectRoute, cache("10 minutes",onlyStatus200), searchRoutes);
  app.use("/api/user", protectRoute, cache("10 minutes",onlyStatus200), userRoutes);
}
module.exports = Routes;
