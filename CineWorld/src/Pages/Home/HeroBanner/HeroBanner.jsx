import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HeroBanner.scss";
import useFetch from "../../../Hooks/UseFetch";
import { Img, ContentWrapper } from "../../../Component";

const HeroBanner = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/now_playing");

  useEffect(() => {
    const background =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackgroundImage(background);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div>
      <div className="hero__Banner">
        {!loading && (
          <div className="backdrop__img">
            <Img src={backgroundImage} />
          </div>
        )}
        <div className="opacity__layer"></div>
        <ContentWrapper>
            <div className="hero__Banner__Content">
              <span className="title">Welcome.</span>
              <span className="subtitle">
                Millions of movies, TV shows and people to discover. Explore
                now.
              </span>
              <div className="search__Input">
                <input
                  type="text"
                  placeholder="Search for a movie and TV show..."
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={searchQueryHandler}
                />
                <button type="button" onClick={()=>navigate(`/search/${query}`)}>Search</button>
              </div>
            </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default HeroBanner;
