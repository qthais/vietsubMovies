import { useEffect, useState } from "react"
import axiosClient from "../api/axiosClient"


const useGetTrendingContent = () => {
    const [trendingContent, setTrendingContent] = useState(null)

    useEffect(() => {
        const getTrendingContent = async () => {
            const res = await axiosClient.get(`/api/movie/trending`)
            setTrendingContent(res.data.content)
        }
        getTrendingContent()
    }, [])
    return {trendingContent}
}
const useGetAllMovies=()=>{
    const [allMovies, setAllMovies] = useState([])

    useEffect(() => {
        const getAllMovies = async () => {
            const res = await axiosClient.get(`/api/movie/all?limit=0`)
            setAllMovies(res.data.content)
        }
        getAllMovies()
    }, [])
    return {allMovies,setAllMovies}
}
const useGetMoviesByType= (category)=>{
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const getAllMovies = async () => {
            const res = await axiosClient.get(`/api/movie/type?category=${category}`)
            setMovies(res.data.content)
        }
        getAllMovies()
    }, [])
    return {movies,setMovies}
}

export {useGetTrendingContent,useGetAllMovies,useGetMoviesByType}