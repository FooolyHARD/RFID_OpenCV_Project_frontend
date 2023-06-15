import React, { useEffect, useRef, useState } from 'react';
import '../css/WebRTC.css';

const WebRTCComponent: React.FC = () => {
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const negotiate = async (): Promise<void> => {
    pcRef.current?.addTransceiver('video', { direction: 'recvonly' });
    pcRef.current?.addTransceiver('audio', { direction: 'recvonly' });

    try {
      const offer = await pcRef.current?.createOffer();
      await pcRef.current?.setLocalDescription(offer);

      await new Promise<void>((resolve) => {
        if (pcRef.current?.iceGatheringState === 'complete') {
          resolve();
        } else {
          function checkState() {
            if (pcRef.current?.iceGatheringState === 'complete') {
              pcRef.current.removeEventListener('icegatheringstatechange', checkState);
              resolve();
            }
          }
          pcRef.current?.addEventListener('icegatheringstatechange', checkState);
        }
      });

      const response = await fetch('http://172.28.19.221:6500/offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sdp: pcRef.current?.localDescription?.sdp,
          type: pcRef.current?.localDescription?.type,
        }),
      });

      const answer = await response.json();
      await pcRef.current?.setRemoteDescription(answer);
    } catch (e) {
      alert(e);
    }
  };
  
  const toggleStartStop = (): void => {
    if (isRunning) {
      stop();
    } else {
      start();
    }
  };

  const start = (): void => {
    const config = {
      sdpSemantics: 'unified-plan',
      iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
    };
   
    pcRef.current = new RTCPeerConnection(config);

    pcRef.current.addEventListener('track', (evt) => {
      if (evt.track.kind === 'video') {
        const videoElement = document.getElementById('video') as HTMLVideoElement;
        videoElement.srcObject = evt.streams[evt.streams.length - 1];
      }
    });

    setIsRunning(true);
    negotiate();
  };

  const stop = (): void => {
    setIsRunning(false);
    setTimeout(() => {
      pcRef.current?.close();
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <button id="toggle" onClick={toggleStartStop}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <video id="video" autoPlay playsInline />
      <audio id="audio" />
    </div>
  );
};

export default WebRTCComponent;
