const TwitchConfig = {
    botName : process.env.REACT_APP_SECRET_BOT_NAME,
    oauthToken : process.env.REACT_APP_SECRET_BOT_OAUTH_TOKEN,
    clientToken: process.env.REACT_APP_SECRET_TWITCH_CLIENT_TOKEN,
    clientId: process.env.REACT_APP_SECRET_TWITCH_CLIENT_ID,
    refreshToken: process.env.REACT_APP_SECRET_REFRESH_TOKEN
}

export default TwitchConfig; 