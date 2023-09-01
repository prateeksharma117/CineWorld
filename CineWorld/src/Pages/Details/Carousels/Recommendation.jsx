import React from "react";

import {Carousel} from "../../../Component";
import useFetch from "../../../Hooks/UseFetch";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endPoint={mediaType}
        />
    );
};

export default Recommendation;