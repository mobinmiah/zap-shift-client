import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading/Loading";

const TrackParcel = () => {
  const { trackingId } = useParams();
  const axios = useAxios();
  const { data: trackings = [], isLoading } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axios.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });

const {data: parcels=[]}=useQuery({
  queryKey:['parcel'],
  queryFn: async()=>{
    const res= await axios.get('/parcels')
    return res.data
  }
})
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="my-20 p-3 bg-base-100 rounded-lg">
      <h2>
        Track Your Parcel <span className={`text-success`}>{trackingId}</span>
      </h2>
      <h3>Total Logs : ({trackings.length})</h3>
      <ul className="timeline timeline-vertical">
        {trackings.map((log) => (
          <li key={log._id}>
            <div className="timeline-start text-xl">{new Date(log.createdAt).toLocaleString()}</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box text-xl">{log.details}</div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackParcel;
