import { useState } from "react";
import { ContentWrapper, SwitchTabs, Carousel } from "../../../Component";
import useFetch from "../../../Hooks/UseFetch";

const Popular = () => {
  const [endPoint, setEndPoint] = useState("movie");
  const [list, setList] = useState("now_playing");
  const { data, loading } = useFetch(`/${endPoint}/${list}`);

  const onTabsChange = (data) => {
    setEndPoint(data === "Movies" ? "movie" : "tv");
    setList(endPoint === "movie" ? "airing_today" : "now_playing");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">{endPoint==='movie'?'Now Playing':`Airing Today`}</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabsChange={onTabsChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
    </div>
  );
};

export default Popular;
