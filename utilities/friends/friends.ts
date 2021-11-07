export interface FriendRequest {
  receiver: {
    name: string;
    photoURL: string;
    username: string;
    about?: string;
    games?: string[];
    uid: string;
  };
  sender: {
    name: string;
    photoURL: string;
    username: string;
    about?: string;
    games?: string[];
    uid: string;
  };
  toUid: string;
  fromUid: string;
  id?: string;
}
