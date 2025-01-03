export interface User {
  uid: string;
  email?: string | undefined;
  name: string;
  photoURL?: string | undefined;
  linkedPageId?: string | null | undefined;
}

export interface BasicUserType {
  docId?: string;
  uid: string;
  username: string;
  name?: string;
  photoURL?: string | undefined | null;
}

export interface GamerType {
  docId?: string;
  uid: string;
  username: string;
  name?: string;
  photoURL?: string | undefined | null;
  inGameName?: string;
  inGameId?: string;
}

export interface UserData {
  docId?: string;
  photoURL?: string | undefined;
  uid: string;
  username: string;
  name?: string | undefined;
  dob?: Date | undefined;
  about?: string;
  location?: string;
  phoneNumber?: string | undefined;
  email?: string | undefined;
  youtubeLink?: string | undefined;
  twitchLink?: string | undefined;
  facebookLink?: string | undefined;
  instagramLink?: string | undefined;
  twitterLink?: string | undefined;
  redditLink?: string | undefined;
  fcmToken?: string | null;
  linkedPageIds?: string[];
  games?: string[];
  followersCount?: number;
  followeesCount?: number;
}

export interface GamerData {
  docId?: string | undefined;
  gameCode?: string | undefined;
  inGameName: string | undefined;
  inGameId: string | undefined;
  username?: string | undefined;
  uid: string;
  kd?: string | undefined;
  highestTier?: string | undefined;
  damage?: string | undefined;
  kills?: string | undefined;
  about?: string | undefined;
  name?: string | undefined;
  photoURL?: string | undefined | null;
}
export interface TeamType {
  slotNumber?: number;
  teamName: string;
  phoneNumber?: string;
  gamers: BasicUserType[];
  invitedGamers?: BasicUserType[];
  inGameLead?: string;
  uids: string[];
  invitedUids?: string[];
  docId?: string;
  gamerDetails: any;
}
