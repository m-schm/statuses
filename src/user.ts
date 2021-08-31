export type OnlineStatus = "online" | "away" | "offline";
export type Url = string;
export type User = {
	pfp: Url,
	name: string,
	status: OnlineStatus,
	message: string,
};
