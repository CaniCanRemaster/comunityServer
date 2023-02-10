console.log("-->Starting software");

import * as minecraftBot from "./minecraft.bot";
import * as childProcess from "child_process";
import * as discordBot from "./dicord.bot";
import * as fs from "fs";

let configurationJson = JSON.parse(fs.readFileSync(__dirname + "/configuration.json", { encoding: "utf-8" }));

async function start() {

    let minecraftServer = childProcess.exec(`${__dirname}/minecraftBedrockServer/bedrock_server.exe`, { encoding: "utf-8" });
    minecraftServer.on("message", (message) => {
        console.log("message", message);
    });

    minecraftServer.on("spawn", ()=>{
        console.log("spawn");
    });

    await minecraftBot.start(configurationJson, receiveMessageFromMinecraft);
    await discordBot.start(configurationJson, receiveMessageFromDiscord);

    function receiveMessageFromDiscord(message: any) {
        //console.log("-->Message from discord", message);
        //minecraft.writeMinecraftMessage(configurationJson, message);
    }

    function receiveMessageFromMinecraft(message: any) {
        //console.log("-->Message from minecraft", message);
        if (message.source_name) {
            discordBot.writeDiscordMessage(configurationJson, `<${message.source_name}>: ${message.message}`);
        }
    }

}

start();





