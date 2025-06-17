import { useAuth } from "@/context/AuthContext";
import { useMeet } from "../context/MeetContext";
import { Mic, MicOff } from "lucide-react";

export default function MyCard() {
  const { user } = useAuth();
  const { localVideoRef, isCameraMuted, isAudioMuted } = useMeet();

  return (
    <div className="bg-blue-500/80 backdrop-blur-sm rounded-xl flex flex-col shadow-lg justify-between h-full">
      <div className="px-4 py-2 w-full flex items-center justify-between">
        <p className="text-white text-sm">{user.name}</p>
        {!isCameraMuted && (
          <>
            {isAudioMuted ? (
              <MicOff className="w-4 h-4 text-white/80 drop-shadow-lg" />
            ) : (
              <Mic className="w-4 h-4 text-white/80 drop-shadow-lg" />
            )}
          </>
        )}
      </div>
      <div
        className={
          isCameraMuted
            ? "invisible h-0 w-0"
            : "relative w-full h-full overflow-hidden rounded-xl"
        }
      >
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
        />
      </div>
      {isCameraMuted && (
        <div className="flex justify-center items-center flex-1">
          {isAudioMuted ? (
            <MicOff className="w-8 h-8 text-white/80 drop-shadow-lg" />
          ) : (
            <Mic className="w-8 h-8 text-white/80 drop-shadow-lg" />
          )}
        </div>
      )}
    </div>
  );
}
