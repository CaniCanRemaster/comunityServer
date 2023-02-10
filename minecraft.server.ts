import * as childProcess from "child_process";

export async function start() {

    let minecraftServer = await new Promise((resolve, reject) => {
        let minecraftServerProcess = childProcess.spawn(`${__dirname}/minecraftBedrockServer/bedrock_server.exe`);
        minecraftServerProcess.on("spawn", () => {
            resolve({
                return: true,
                data: "Minecraft server started"
            });
        });
        minecraftServerProcess.on("error", (error) => {
            resolve({
                return: false,
                data: error
            });
        });
        minecraftServerProcess.on("message", (message) => {
            console.log(message);
        });
        minecraftServerProcess.on("close", (error) => {
            resolve({
                return: false,
                data: error
            });
        });
        minecraftServerProcess.on("disconnect", (error: any) => {
            resolve({
                return: false,
                data: error
            });
        });
        minecraftServerProcess.on("exit", (error) => {
            resolve({
                return: false,
                data: error
            });
        });
    });

    return minecraftServer;
}