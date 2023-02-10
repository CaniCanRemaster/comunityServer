import * as discord from "discord.js";

let options: discord.ClientOptions = {
    intents: [
        discord.GatewayIntentBits.DirectMessages,
        discord.GatewayIntentBits.MessageContent,
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.GuildVoiceStates,
        discord.GatewayIntentBits.GuildIntegrations
    ]
}

export const client = new discord.Client(options);

export async function start(configurationJson: any, catchMessageFunction: Function) {
    let promiseResolved = await new Promise((resolve, reject) => {
        client.on('ready', () => {
            resolve(client);
        });
        setTimeout(reject, 10000);
        client.on('messageCreate', (message) => {
            if (message.channelId == configurationJson["discord"]["bot"]["channel"]) {
                catchMessageFunction(message);
            }
        });
        client.login(configurationJson["discord"]["bot"]["token"]);
    })
    return promiseResolved;
}

export async function writeDiscordMessage(configurationJson: any, message: any) {
    const channel = await client.channels.fetch(configurationJson["discord"]["bot"]["channel"]);
    if (channel && channel.type == discord.ChannelType.GuildText) channel.send(message);
}
