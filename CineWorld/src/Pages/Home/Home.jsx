import React from 'react'
import './Home.scss'
import {HeroBanner,Trending,Popular,TopRated,NowPlaying,UpComming} from'../Home'

const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner/>
      <Trending/>
      <NowPlaying/>
      <UpComming/>
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default Home
