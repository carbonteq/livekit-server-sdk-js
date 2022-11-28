import { EgressClient, } from "./src/EgressClient"
import { FileAndStreamOutput, EncodedFileType, StreamProtocol } from "./src/proto/livekit_egress"

async function main() {

    const egressclient = new EgressClient("ws://localhost:7880", "API7KyKknWj9RVW", "6AKnxnqWWKDXyE8iMM2zffgZYv6Qfm09DuPRVFcHZybB")

    const fileAndStream: FileAndStreamOutput = {
        fileType: EncodedFileType.MP4,
        filepath: "ts_test.mp4",
        urls: ["rtmp://a.rtmp.youtube.com/live2"],
        protocol: StreamProtocol.RTMP


    }


    const info = await egressclient.startTrackCompositeEgress("joji", fileAndStream, "TR_AMiJwt5QM43rCr", "TR_VCDZJkdoQffgMY"
    )

    if (info.error !== "") {
        console.log("error while connecting egress client")

    }

    const egressID = info.egressId;

    setTimeout(async () => {
        await egressclient.stopEgress(egressID);
    }, 50000);
}

main();
