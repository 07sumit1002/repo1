import React from 'react';
import { useParams } from 'react-router-dom';
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'

const RoomPage = () => {
  const { roomId } = useParams();

  const myMeeting = async (element) => {

    const appID = 1290555631;
    const serverSecret = "93de56c14d703e930bae8d1f1901270f";
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID, 
      serverSecret, 
      roomId,  
      Date.now().toString(),  
      "Sumit"
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Copy link',
          url:
           window.location.protocol + '//' + 
           window.location.host + window.location.pathname +
            '?roomID=' +
            roomId,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
      showScreenSharingButton: true,
    });

  }

  return (
    <div>
      <div ref={myMeeting} />
      {/* <h1>Roompage {roomId} </h1> */}
    </div>
  )
}

export default RoomPage;
