console.log("-->Starting software");

import * as minecraftServer from "./minecraft.server";
import * as minecraftBot from "./minecraft.bot";
import * as discordBot from "./dicord.bot";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();
let configurationJson = JSON.parse(fs.readFileSync(__dirname + "/configuration.json", { encoding: "utf-8" }));
configurationJson["discord"]["bot"]["token"] = process.env["token"];

async function start() {

    //let minecraftServerInstance = await minecraftServer.start();
    //console.log("-->Minecraft server: ", minecraftServerInstance);

    setTimeout(async function () {
        await minecraftBot.start(configurationJson, receiveMessageFromMinecraft);
        await discordBot.start(configurationJson, receiveMessageFromDiscord);
    }, 20000);

    function receiveMessageFromDiscord(message: any) {
        console.log("-->Message from discord", message);
        minecraftBot.writeMinecraftMessage(configurationJson, message);
    }

    function receiveMessageFromMinecraft(message: any) {
        //console.log("-->Message from minecraft", message);
        if (message.source_name) {
            discordBot.writeDiscordMessage(configurationJson, `<${message.source_name}>: ${message.message}`);
        }
    }

}

setInterval(() => console.log("-->Executing..."), 360000);

start();





