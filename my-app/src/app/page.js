"use client";
import { useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5500", { transports: ["websocket"] });
const roomId = "my-room";

export default function Home() {
  const localVideo = useRef();
  const remoteVideo = useRef();
  const peerConnection = useRef();
  const roomId = "my-room"; // static for demo
  useEffect(() => {
    async function init() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideo.current.srcObject = stream;
      peerConnection.current = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          {
            urls: "turn:0.tcp.ngrok.io:15789?transport=tcp",
            username: "user",
            credential: "pass",
          },
        ],
      });
      stream
        .getTracks()
        .forEach((track) => peerConnection.current.addTrack(track, stream));
      peerConnection.current.ontrack = (event) => {
        remoteVideo.current.srcObject = event.streams[0];
      };
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", { candidate: event.candidate, roomId });
        }
      };
      socket.emit("join-room", roomId);
    }
    init();

    socket.on("user-joined", async () => {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.emit("offer", { offer, roomId });
    });
    socket.on("offer", async (offer) => {
      await peerConnection.current.setRemoteDescription(offer);
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit("answer", { answer, roomId });
    });
    socket.on("answer", async (answer) => {
      await peerConnection.current.setRemoteDescription(answer);
    });
    socket.on("ice-candidate", async (candidate) => {
      await peerConnection.current.addIceCandidate(candidate);
    });
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <video
        ref={localVideo}
        autoPlay
        playsInline
        muted
        style={{ width: "5%" }}
      />
      <video ref={remoteVideo} autoPlay playsInline style={{ width: "5%" }} />
    </div>
  );
}
