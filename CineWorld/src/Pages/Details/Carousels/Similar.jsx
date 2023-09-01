import React from "react";

import {Carousel} from "../../../Component";
import useFetch from "../../../Hooks/UseFetch";

const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);
    let title = '';

    title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
    console.log(mediaType);




    return (
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endPoint={mediaType}
        />
    );
};

export default Similar;