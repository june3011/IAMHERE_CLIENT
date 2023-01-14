export interface MessageRequestDto {
  userId: number;
  chatRoomId: number;
  message: string;
  type: "image" | "text";
}
