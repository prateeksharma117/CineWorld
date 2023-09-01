import { useState } from "react";
import { ContentWrapper, SwitchTabs, Carousel } from "../../../Component";
import useFetch from "../../../Hooks/UseFetch";

const UpComming = () => {
  const [endPoint, setEndPoint] = useState("movie");
  const [list, setList] = useState("upcoming");
  const { data, loading } = useFetch(`/${endPoint}/${list}`);

  const onTabsChange = (data) => {
    setEndPoint(data === "Movies" ? "movie" : "tv");
    setList(endPoint === "movie" ? "on_the_air" : "upcoming");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">{endPoint==='movie'?'Up Comming':`On The Air`}</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabsChange={onTabsChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
    </div>
  );
};

export default UpComming;
