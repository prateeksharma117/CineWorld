import {useState} from 'react'
import {ContentWrapper,SwitchTabs,Carousel} from '../../../Component'
import useFetch from '../../../Hooks/UseFetch'

const Trending = () => {

  const [endPoint, setEndPoint] = useState('day')
  const {data,loading}=useFetch(`/trending/all/${endPoint}`)


    const onTabsChange = (data) => {
      setEndPoint(data==='Day'?"day":"week")
    }



  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Trending</span>
            <SwitchTabs data={["Day","Week"]} onTabsChange={onTabsChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending
