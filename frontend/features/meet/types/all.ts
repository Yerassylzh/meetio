import { TokenUser } from "@/types/db";

export interface UserVideo {
  user: TokenUser;
  srcObject: MediaStream | null;
  isMuted: boolean;
  isCameraOff: boolean;
}
