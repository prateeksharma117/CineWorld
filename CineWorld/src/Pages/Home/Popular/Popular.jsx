import { useState } from "react";
import { ContentWrapper, SwitchTabs, Carousel } from "../../../Component";
import useFetch from "../../../Hooks/UseFetch";

const Popular = () => {
  const [endPoint, setEndPoint] = useState("movie");
  const { data, loading } = useFetch(`/${endPoint}/popular`);

  const onTabsChange = (data) => {
    setEndPoint(data === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Popular</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabsChange={onTabsChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
    </div>
  );
};

export default Popular;
