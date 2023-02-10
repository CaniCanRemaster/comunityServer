
const bedrockProtocol = require('bedrock-protocol');
let client: any;

export async function start(configurationJson: any, receiveMessageFromMinecraft: Function){
    client = bedrockProtocol.createClient({
        host: configurationJson["minecraft"]["server"]["host"],
        username: configurationJson["minecraft"]["server"]["user"]["name"],
        port: configurationJson["minecraft"]["server"]["port"],
        offline: true
    });
    
    client.on('text', (message: any) => { // Listen for chat messages and echo them back.
        if (message.source_name != client.username) {
            receiveMessageFromMinecraft(message);
        }
    });

    return client;
}

export async function writeMinecraftMessage(configurationJson: any, message: any){
    client.queue('text', {
        type: 'chat', needs_translation: false, source_name: client.username, xuid: '', platform_chat_id: '',
        message: message
    });
}