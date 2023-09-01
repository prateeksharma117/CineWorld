import React from 'react'
import './Details.scss'
import useFetch from '../../Hooks/UseFetch'
import { useParams } from 'react-router-dom'
import {DetailBanner,Cast, VideoSection,Similar,Recommendation} from '../Details'

const Details = () => {

  const {mediaType,id}=useParams()
  const {data,loading}=useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits,loading:creditsLoading}=useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div>
      <DetailBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideoSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details
