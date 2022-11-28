import { EgressClient } from "./EgressClient"
import { FileAndStreamOutput, EncodedFileType, StreamProtocol, EgressInfo, StreamOutput } from "./proto/livekit_egress"
import { RoomServiceClient } from "./RoomServiceClient"

async function main() {

    const egressclient = new EgressClient("ws://localhost:7880", "APIHYMqEBWRYk56", "QXezAhFLT9BOKDMEOUnAKU3OGFQZowzyrsanbMfmFmY")

    const fileAndStream: FileAndStreamOutput = {
        fileType: EncodedFileType.MP4,
        filepath: "ts_test.mp4",
        urls: ["rtmp://a.rtmp.youtube.com/live2/d3cj-6f7c-g375-034x-e3hr"],
        protocol: StreamProtocol.RTMP


    }

    const streamOnly:StreamOutput={
        urls: ["rtmp://a.rtmp.youtube.com/live2/d3cj-6f7c-g375-034x-e3hr"],
        protocol: StreamProtocol.RTMP

    }

// TR_AM6BicK9ha7VBm", "TR_VCTUvYMKC737jf
    const info = await egressclient.startTrackCompositeEgress("joji", streamOnly,{videoTrackId:"TR_VCTUvYMKC737jf",audioTrackId:"TR_AM6BicK9ha7VBm"} 
    )
    
    console.log(info.egressId)
    // const rsc = new RoomServiceClient("http://localhost:7880", "APIHYMqEBWRYk56", "QXezAhFLT9BOKDMEOUnAKU3OGFQZowzyrsanbMfmFmY")
    
    // const a= await rsc.getParticipant("joji","august")
    // a.tracks.forEach(t=>(console.log(t.name,t.sid)))

    if (info.error !== "") {
        console.log("error while connecting egress client")

    }

    const egressID = info.egressId ?? "";

    setTimeout(async () => {
        await egressclient.stopEgress(egressID);
    }, 50000);
}

main();

