import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const RoomPage = () => {
  const { roomId } = useParams();
  const [language, setLanguage] = useState("en"); // Default language is English

  const myMeeting = async (element) => {
    const appID = 1290555631;
    const serverSecret = "93de56c14d703e930bae8d1f1901270f";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
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
        mode: ZegoUIKitPrebuilt.GroupCall, // Group Call mode
      },
      showScreenSharingButton: true,
    });
  };

  return (
    <div className="container text-center">
      <div ref={myMeeting} className="meeting-container mb-4" />

      {/* Language Selection Dropdown */}
      <div className="d-flex justify-content-center align-items-center gap-2">
        <select
          className="form-select w-auto"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh">Chinese</option>
          <option value="hi">Hindi</option>
          <option value="ar">Arabic</option>
          <option value="ru">Russian</option>
          <option value="pt">Portuguese</option>
          <option value="ja">Japanese</option>
        </select>
        <button className="btn btn-success">Translate</button>
      </div>
    </div>
  );
};

export default RoomPage;
