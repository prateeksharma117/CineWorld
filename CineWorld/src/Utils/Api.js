import axios from "axios"

const Base_Url="https://api.themoviedb.org/3"
const TMDB_TOKEN='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjc3MzRjMzU1YWM0ZTBiZGRmY2IzNTlmYzE0YTdjYiIsInN1YiI6IjYyZGY4MDA4ZWE4NGM3MTRlNmZiZjNjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BFUdzZ1PwVtwrtcgfy_aeVULw9kYEmcZ8L9pO8R0tu8'

const headers={
    Authorization:"bearer "+TMDB_TOKEN,   
}

export const fetchDataFromApi=async(url,params) =>{
    try {
        const {data}=await axios.get(Base_Url+url,{
            headers,
            params
        })
        return data
    } catch (err) {
        return err
    }
}