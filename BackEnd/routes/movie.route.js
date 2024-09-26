const express= require('express')
const MovieController=require('../controllers/movie.controller')
const router=express.Router()
router.get("/trending",MovieController.getTrendingMovie)
router.get("/all",MovieController.getAll)
router.post("/create",MovieController.generateMovies)
router.get("/:id/trailers",MovieController.getMovieTrailers)
router.get("/:id/details",MovieController.getMovieDetails)
router.get("/:id/similar",MovieController.getSimilarMovies)
router.get("/:category",MovieController.getMoviesByCategory)
module.exports=router