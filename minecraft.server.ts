import * as childProcess from "child_process";

export async function start() {

    let minecraftServer = await new Promise((resolve, reject) => {
        console.log(`${__dirname}/minecraftBedrockServer/bedrock_server.exe`);
        let minecraftServerProcess = childProcess.execFile(`${__dirname}/minecraftBedrockServer/bedrock_server.exe`, [], (error, stdout, stderr)=>{
            if(error){
                console.log("-->minecraftServerProcess error: ", error);
            }
            if(stdout){
                console.log("-->minecraftServerProcess stdout: ", stdout);
            }
            if(stderr){
                console.log("-->minecraftServerProcess stderr: ", stderr);
            }
        });
    });

    return minecraftServer;
}