import { useDeviceType } from "@/context/DeviceTypeContext";
import { useMeet } from "../context/MeetContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Mic,
  MicOff,
  Phone,
  Video,
  VideoOff,
} from "lucide-react";
import SpinnerSvg from "@/components/SpinnerSvg";

export default function Controls({
  nextPage,
  prevPage,
}: {
  nextPage: () => void;
  prevPage: () => void;
}) {
  const {
    muteAudio,
    unmuteAudio,
    muteCamera,
    unmuteCamera,
    isAudioMuted,
    isCameraMuted,
  } = useMeet();

  const { isMobile } = useDeviceType();

  const [isExiting, setIsExiting] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 bg-gray-900/90 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl">
        <button
          className="md:p-3 p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200"
          title="Prev"
          onClick={prevPage}
        >
          <ChevronLeft className="md:w-5 md:h-5 w-4 h-4" />
        </button>

        <button
          onClick={() => {
            if (!isAudioMuted) {
              muteAudio();
            } else {
              unmuteAudio();
            }
          }}
          className={`md:p-3 p-2 rounded-full transition-all duration-200 ${
            !isAudioMuted
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
          title={!isAudioMuted ? "Mute microphone" : "Unmute microphone"}
        >
          {!isAudioMuted ? (
            <Mic className="md:w-5 md:h-5 w-4 h-4" />
          ) : (
            <MicOff className="md:w-5 md:h-5 w-4 h-4" />
          )}
        </button>

        <button
          onClick={() => {
            if (!isCameraMuted) {
              muteCamera();
            } else {
              unmuteCamera();
            }
          }}
          className={`md:p-3 p-2 rounded-full transition-all duration-200 ${
            !isCameraMuted
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
          title={!isCameraMuted ? "Turn off camera" : "Turn on camera"}
        >
          {!isCameraMuted ? (
            <Video className="md:w-5 md:h-5 w-4 h-4" />
          ) : (
            <VideoOff className="md:w-5 md:h-5 w-4 h-4" />
          )}
        </button>

        <button
          className={`${
            isExiting ? "disabled" : ""
          } md:p-3 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-200`}
          title="End call"
          onClick={() => {
            setIsExiting(true);
            router.push("/");
          }}
        >
          {isExiting ? (
            <SpinnerSvg size={isMobile ? 13 : 17} />
          ) : (
            <Phone className="md:w-5 md:h-5 w-4 h-4 rotate-[135deg]" />
          )}
        </button>

        <button
          className="md:p-3 p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200"
          title="Prev"
          onClick={nextPage}
        >
          <ChevronRight className="md:w-5 md:h-5 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
