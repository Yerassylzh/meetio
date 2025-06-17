import { useEffect, useRef } from "react";
import { UserVideo } from "../types/all";
import { Mic, MicOff } from "lucide-react";

export default function ParticipantCard({ videoObj }: { videoObj: UserVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = videoObj.srcObject;
      videoRef.current.muted = videoObj.isMuted;
    }
  }, [videoObj]);

  return (
    <div className="bg-blue-500/80 backdrop-blur-sm rounded-xl flex flex-col justify-between h-full">
      <div className="px-4 py-2 w-full flex items-center justify-between">
        <p className="text-white text-sm">{`${videoObj.user.name} (${videoObj.user.email})`}</p>
        {!videoObj.isCameraOff && (
          <>
            {videoObj.isMuted ? (
              <MicOff className="w-4 h-4 text-white/80 drop-shadow-lg" />
            ) : (
              <Mic className="w-4 h-4 text-white/80 drop-shadow-lg" />
            )}
          </>
        )}
      </div>
      <div
        className={
          videoObj.isCameraOff
            ? "invisible h-0 w-0"
            : "relative w-full h-full overflow-hidden rounded-xl"
        }
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
        />
      </div>
      {videoObj.isCameraOff && (
        <div className="flex justify-center items-center flex-1">
          {videoObj.isMuted ? (
            <MicOff className="w-8 h-8 text-white/80 drop-shadow-lg" />
          ) : (
            <Mic className="w-8 h-8 text-white/80 drop-shadow-lg" />
          )}
        </div>
      )}
    </div>
  );
}
