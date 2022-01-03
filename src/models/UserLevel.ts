import User from "./User";

enum UserLevel {
    // non-subs, subscriber, founder, VIP, regular, moderator, super moderator, channel editor, channel admin, broadcaster
    NON_SUBS,
    SUBSCRIBER,
    REGULAR,
    FOUNDER,
    VIP,
    MODERATOR,
    SUPER_MODERATOR,
    CHANNEL_EDITOR,
    CHANNEL_ADMIN,
    BROADCASTER,
};

export default UserLevel;