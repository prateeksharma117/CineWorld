import './App.scss'
import { useEffect } from 'react'
import { fetchDataFromApi } from './Utils/Api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration,getGenres} from './Store/HomeSlice'
import {Details, Explore, Home, SearchResult, PageNotFound } from './Pages'
import { Footer, Header } from './Component'
import { Route, Routes } from 'react-router-dom'


function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home)

  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then((data) => {
        const url={
          backdrop:data.images.secure_base_url+"original",
          poster:data.images.secure_base_url+"original",
          profile:data.images.secure_base_url+"original",
        }
        dispatch(getApiConfiguration(url))
      })
  }

  const genresCall= async()=>{
    let promises=[]
    let endPoints=["tv","movie"]
    let allGenres={}

    endPoints?.forEach((url)=>{
      promises?.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data =await Promise.all(promises)
    data?.map(({genres})=>{
      return genres?.map((item)=>(
        allGenres[item.id]=item
      ))
    })

    dispatch(getGenres(allGenres))
  }


  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:mediaType/:id' element={<Details/>}/>
      <Route path='/search/:query' element={<SearchResult/>}/>
      <Route path='/explore/:mediaType' element={<Explore/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
