import { EgressClient } from "./EgressClient"
import { FileAndStreamOutput, EncodedFileType, StreamProtocol, EgressInfo, StreamOutput, EncodedFileOutput } from "./proto/livekit_egress"
import { RoomServiceClient } from "./RoomServiceClient"

async function main() {

    const egressclient = new EgressClient("ws://localhost:7880", "APIHYMqEBWRYk56", "QXezAhFLT9BOKDMEOUnAKU3OGFQZowzyrsanbMfmFmY")

    const fileAndStream: FileAndStreamOutput = {
        fileType: EncodedFileType.MP4,
        filepath: "rehan_test_FNS.mp4",
        urls: ["rtmp://a.rtmp.youtube.com/live2/d3cj-6f7c-g375-034x-e3hr"],
        protocol: StreamProtocol.RTMP,
        disableManifest: false,
        s3:undefined,
        gcp: undefined,
        azure: undefined,
        aliOSS : undefined

    }

    const streamOnly: StreamOutput = {
        urls: ["rtmp://a.rtmp.youtube.com/live2/d3cj-6f7c-g375-034x-e3hr"],
        protocol: StreamProtocol.RTMP

    }

    const fileOnly: EncodedFileOutput = {
        fileType: EncodedFileType.MP4,
        filepath: "rehan_test_fileOnly.mp4"

    }




    // TR_AM6BicK9ha7VBm", "TR_VCTUvYMKC737jf
    const info = await egressclient.startTrackCompositeEgress("joji", fileAndStream, {audioTrackId:"TR_AMp2yhSY4uofi6" , videoTrackId:"TR_VCKyHHZNJ2Fvwv"}
    )

    console.log("egress id ", info.egressId)
    console.log("track composite  : ", info.trackComposite)
    // console.log("file and stream : " ,info.fileAndStream)
    // console.log("file only  : ",info.file)
    // console.log("stream only :  ",info.stream)

    // const rsc = new RoomServiceClient("http://localhost:7880", "APIHYMqEBWRYk56", "QXezAhFLT9BOKDMEOUnAKU3OGFQZowzyrsanbMfmFmY")

    // const a= await rsc.getParticipant("joji","august")
    // a.tracks.forEach(t=>(console.log(t.name,t.sid)))

    if (info.error !== "") {
        console.log("error while connecting egress client")

    }

    const egressID = info.egressId ?? "";

    setTimeout(async () => {
        await egressclient.stopEgress(egressID);
    }, 500000);
}

main();

