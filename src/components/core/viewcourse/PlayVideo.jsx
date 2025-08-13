import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slice/viewCourseSlice";
import { Player } from "video-react";
import { AiFillPlayCircle } from "react-icons/ai";
import "video-react/dist/video-react.css"; // important!
import IconBtn from "../../common/CommonButton";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, completedLectures } = useSelector(
    (state) => state.viewCourse
  );

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!courseSectionData.length) return;

    const filteredSection = courseSectionData.find(
      (section) => section._id === sectionId
    );
    if (!filteredSection) return;

    const filteredVideo = filteredSection.subSection.find(
      (video) => video._id === subSectionId
    );
    setVideoData(filteredVideo || null);
    setVideoEnded(false);
  }, [courseSectionData, sectionId, subSectionId, location.pathname]);

  const isFirstVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );
    const subSectionIndex = courseSectionData[sectionIndex].subSection.findIndex(
      (sub) => sub._id === subSectionId
    );
    return sectionIndex === 0 && subSectionIndex === 0;
  };

  const isLastVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );
    const subSectionIndex = courseSectionData[sectionIndex].subSection.findIndex(
      (sub) => sub._id === subSectionId
    );
    return (
      sectionIndex === courseSectionData.length - 1 &&
      subSectionIndex === courseSectionData[sectionIndex].subSection.length - 1
    );
  };

  const goToNextVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );
    const subSectionIndex = courseSectionData[sectionIndex].subSection.findIndex(
      (sub) => sub._id === subSectionId
    );

    if (
      subSectionIndex <
      courseSectionData[sectionIndex].subSection.length - 1
    ) {
      const nextSubId =
        courseSectionData[sectionIndex].subSection[subSectionIndex + 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubId}`
      );
    } else if (sectionIndex < courseSectionData.length - 1) {
      const nextSection = courseSectionData[sectionIndex + 1];
      navigate(
        `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSection.subSection[0]._id}`
      );
    }
  };

  const goToPrevVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );
    const subSectionIndex = courseSectionData[sectionIndex].subSection.findIndex(
      (sub) => sub._id === subSectionId
    );

    if (subSectionIndex > 0) {
      const prevSubId =
        courseSectionData[sectionIndex].subSection[subSectionIndex - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubId}`
      );
    } else if (sectionIndex > 0) {
      const prevSection = courseSectionData[sectionIndex - 1];
      const lastVideo =
        prevSection.subSection[prevSection.subSection.length - 1];
      navigate(
        `/view-course/${courseId}/section/${prevSection._id}/sub-section/${lastVideo._id}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete({ courseId, subSectionId }, token);
    if (res) dispatch(updateCompletedLectures(subSectionId));
    setLoading(false);
  };

  return (
    <div className="w-full p-4 text-white">
      {!videoData ? (
        <p className="text-center text-red-400 font-semibold text-lg">No Video Data Found</p>
      ) : (
        <>
          <div className="aspect-video mb-6 rounded-lg overflow-hidden">
            <Player
              ref={playerRef}
              playsInline
              controls
              fluid={true}
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoUrl}
            />
          </div>

          {videoEnded && (
            <div className="bg-gray-800 rounded-lg p-4 mb-4 space-y-4">
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onClick={handleLectureCompletion}
                  text={!loading ? "✅ Mark As Completed" : "Loading..."}
                />
              )}

              <IconBtn
                onClick={() => {
                  if (playerRef.current) {
                    playerRef.current.actions.seek(0);
                    playerRef.current.actions.play();
                    setVideoEnded(false);
                  }
                }}
                text="🔁 Rewatch"
              />

              <div className="flex gap-3">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    ⬅️ Previous
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                  >
                    Next ➡️
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="mt-4">
            <h1 className="text-2xl font-bold text-white">{videoData?.title}</h1>
            <p className="mt-2 text-gray-300">{videoData?.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoDetails;
