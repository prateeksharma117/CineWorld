import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./DetailBanner.scss";
import { ContentWrapper, Genres, CircleRating, Img, VideoPopup } from "../../../Component";
import useFetch from "../../../Hooks/UseFetch";
import posterFallback from "../../../assets/no_poster.png";
import PlayBtn from "../PlayBtn/PlayBtn";
import numeral from "numeral";

const DetailBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const [show, setShow] = useState(false)
  const [videoId, setVideoId] = useState(null)
  const { url } = useSelector((state) => state.home);
  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const genres = data?.genres?.map((gen) => gen.id);
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <img src={url.backdrop + data?.backdrop_path} alt="backdrop" />
              </div>

              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={posterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data.release_date || data.first_air_date
                      ).format("MMM D, YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={genres} />

                    <div className="row">
                      {data.vote_average&&(
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                      )}
                      <div className="playbtn" onClick={() => {setShow(true), setVideoId(video?.key)}}>
                        <PlayBtn />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data?.status && (
                        <div className="infoItem">
                          <span className="text bold">Status:{""}</span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}

                      {data?.status && (
                        <div className="infoItem">
                          <span className="text bold">18+:{""}</span>
                          <span className="text">
                            {data.adult == 0 ? "No" : "Yes"}
                          </span>
                        </div>
                      )}

                      {data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime:{""}</span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}

                      {data?.number_of_seasons && (
                        <div className="infoItem">
                          <span className="text bold">Total Seasons:{""}</span>
                          <span className="text">{data.number_of_seasons}</span>
                        </div>
                      )}

                      {data?.number_of_episodes && (
                        <div className="infoItem">
                          <span className="text bold">Total Episode:{""}</span>
                          <span className="text">
                            {data.number_of_episodes}
                          </span>
                        </div>
                      )}

                      {data?.budget && (
                        <div className="infoItem">
                          <span className="text bold">Budget:{""}</span>
                          <span className="text">
                            {numeral(data.budget).format("($ 0.00 a)")}
                          </span>
                        </div>
                      )}

                      {data?.revenue && (
                        <div className="infoItem">
                          <span className="text bold">Revenue:{""}</span>
                          <span className="text">
                            {numeral(data.revenue).format("($ 0.00 a)")}
                          </span>
                        </div>
                      )}

                      {data?.in_production && (
                        <div className="infoItem">
                          <span className="text bold">In Production:{""}</span>
                          <span className="text">
                            {data.in_production == true ? "Yes" : "No"}
                          </span>
                        </div>
                      )}

                      {data?.production_countries && (
                        <div className="infoItem">
                          <span className="text bold">
                            Production Country:{""}
                          </span>
                          <span className="text">
                            {data.production_countries.map((country, index) => (
                              <span key={index}>
                                {country.name}
                                {data.production_countries.length - 1 !==
                                  index && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director:{""}</span>
                        <span className="text">
                          {director?.map((d, index) => (
                            <span key={index}>
                              {d.name}
                              {director.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer:{""}</span>
                        <span className="text">
                          {writer?.map((d, index) => (
                            <span key={index}>
                              {d.name}
                              {writer.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator:{""}</span>
                        <span className="text">
                          {data?.created_by?.map((d, index) => (
                            <span key={index}>
                              {d.name}
                              {data?.created_by.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailBanner;
