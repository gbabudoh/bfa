"use client";
/// <reference types="styled-jsx" />

import {
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  TrackToggle,
  DisconnectButton,
  useParticipants,
  Chat,
  useLocalParticipant,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track, RoomEvent, type TranscriptionSegment, type Participant } from "livekit-client";
import { useEffect, useState } from "react";
import { Mic, ShieldCheck, Users, MessageSquare, X, Monitor, Phone, PhoneOff, Video as VideoIcon } from "lucide-react";
import Image from "next/image";

interface VideoCallProps {
  room: string;
  username: string;
  vendorLogo: string | null;
  mode: 'voice' | 'video';
  onClose: () => void;
}

export default function VideoCall({ room, username, vendorLogo, mode, onClose }: VideoCallProps) {
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit/token?room=${room}&username=${username}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [room, username]);

  if (token === "") {
    return (
      <div className="fixed inset-0 z-[100] bg-[#1c1c1c] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="h-16 w-16 border-4 border-[#D9A606]/20 border-t-[#D9A606] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-[#D9A606]" />
            </div>
          </div>
          <p className="text-white text-sm font-medium">Connecting to room…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#1c1c1c] flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      <LiveKitRoom
        video={mode === 'video'}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        onDisconnected={onClose}
        data-lk-theme="default"
        className="flex flex-col h-full"
      >
        <RoomInner vendorLogo={vendorLogo} mode={mode} />
      </LiveKitRoom>
    </div>
  );
}

function RoomInner({ vendorLogo, mode }: { vendorLogo: string | null; mode: 'voice' | 'video' }) {
  const participants = useParticipants();
  const [showChat, setShowChat] = useState(false);
  const { localParticipant } = useLocalParticipant();
  const isScreenSharing = localParticipant?.isScreenShareEnabled ?? false;

  return (
    <div className="flex flex-col h-full">
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#1c1c1c] border-b border-white/5 z-20 flex-shrink-0">
        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
          BFA {mode === 'voice' ? 'Voice' : 'Video'} Call
        </span>
        <div className="flex items-center gap-4">
          {isScreenSharing && (
            <div className="flex items-center gap-2 text-green-500 text-sm bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
              <Monitor className="h-4 w-4" />
              <span className="font-bold text-[10px] uppercase">Sharing Screen</span>
            </div>
          )}
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <Users className="h-3.5 w-3.5 text-[#D9A606]" />
            <span className="text-white text-xs font-bold">{participants.length}</span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 flex overflow-hidden relative max-w-full">

        {/* Large Main Area */}
        <div className="flex-1 relative bg-[#121212] overflow-hidden">
          {mode === 'voice' ? (
            <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
               {/* Background Glow */}
               <div className="absolute inset-0 bg-gradient-to-tr from-[#D9A606]/5 to-transparent"></div>
               
               <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-8">
                     {/* Pulse circles for voice call effect */}
                     <div className="absolute inset-0 rounded-full bg-[#D9A606]/20 animate-ping"></div>
                     <div className="absolute inset-[-20px] rounded-full bg-[#D9A606]/10 animate-pulse duration-[2000ms]"></div>
                     
                     <div className="relative h-40 w-40 rounded-[3rem] bg-gradient-to-tr from-[#D9A606] to-[#F2B705] p-1 shadow-2xl shadow-[#D9A606]/20">
                        <div className="w-full h-full rounded-[2.8rem] bg-[#1c1c1c] flex items-center justify-center overflow-hidden">
                           {vendorLogo ? (
                             <Image src={vendorLogo} alt="Vendor" fill className="object-cover opacity-80" />
                           ) : (
                             <Phone className="w-16 h-16 text-[#D9A606] opacity-40" />
                           )}
                        </div>
                     </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-white uppercase tracking-tightest mb-2">Voice Session Active</h3>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                     <div className="flex gap-1 items-center h-4">
                        {[1, 2, 3, 4, 5].map(i => (
                           <div key={i} className={`w-1 bg-[#D9A606] rounded-full transition-all duration-300 ${participants.some(p => p.isSpeaking) ? 'h-full animate-bounce' : 'h-1.5'}`} style={{ animationDelay: `${i * 100}ms` }}></div>
                        ))}
                     </div>
                     <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{participants.some(p => p.isSpeaking) ? 'Audio detected' : 'Waiting for voice...'}</span>
                  </div>
               </div>
            </div>
          ) : (
            <MainSpeakerVideo vendorLogo={vendorLogo} />
          )}

          {/* Transcription overlay */}
          <div className="absolute bottom-10 left-0 right-0 z-50 pointer-events-none flex justify-center">
            <TranscriptionOverlay />
          </div>
        </div>

        {/* ── Right Sidebar: stacked participant tiles (Only in Video mode or if multiple in Voice) ── */}
        {(mode === 'video' || participants.length > 2) && (
          <div className="w-48 flex flex-col bg-[#1c1c1c] border-l border-white/5 overflow-y-auto flex-shrink-0">
            <ParticipantSidebar />
          </div>
        )}

        {/* ── Chat Panel ── */}
        {showChat && (
          <div className="w-[320px] flex flex-col bg-[#1e1e1e] border-l border-white/5 flex-shrink-0 overflow-hidden lk-chat-panel">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 flex-shrink-0">
              <span className="text-white text-xs font-black uppercase tracking-widest">Chat Room</span>
              <button
                onClick={() => setShowChat(false)}
                className="text-zinc-400 hover:text-white transition-colors p-2 rounded-xl bg-white/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <Chat />
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Control Bar ── */}
      <div className="flex-shrink-0 bg-[#1c1c1c] py-6 flex items-center justify-center gap-4 border-t border-white/5">
        <TrackToggle
          source={Track.Source.Microphone}
          className="lk-img-ctrl-btn"
        >
          <Mic className="h-4 w-4" />
        </TrackToggle>

        {mode === 'video' && (
          <TrackToggle
            source={Track.Source.Camera}
            className="lk-img-ctrl-btn"
          >
            <VideoIcon className="h-4 w-4" />
          </TrackToggle>
        )}

        {mode === 'video' && (
          <TrackToggle
            source={Track.Source.ScreenShare}
            className="lk-img-ctrl-btn"
          >
            <Monitor className="h-4 w-4" />
          </TrackToggle>
        )}

        <button
          onClick={() => setShowChat((v) => !v)}
          className={`lk-img-ctrl-btn lk-img-chat-btn ${showChat ? "lk-img-chat-active" : ""}`}
        >
          <MessageSquare className="h-4 w-4" />
          <span className="font-bold">Chat</span>
        </button>

        <DisconnectButton className="lk-img-end-btn">
          {mode === 'voice' ? <PhoneOff className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
          End Call
        </DisconnectButton>
      </div>

      <RoomAudioRenderer />

      <style jsx global>{`
        /* ── Control bar buttons ── */
        .lk-img-ctrl-btn {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          background: rgba(255,255,255,0.08) !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          border-radius: 8px !important;
          color: #ffffff !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          padding: 9px 18px !important;
          cursor: pointer !important;
          transition: background 0.2s, border-color 0.2s !important;
          white-space: nowrap !important;
        }
        .lk-img-ctrl-btn:hover {
          background: rgba(255,255,255,0.14) !important;
          border-color: rgba(255,255,255,0.22) !important;
        }
        .lk-img-ctrl-btn[data-lk-on="false"] {
          background: rgba(239,68,68,0.15) !important;
          border-color: rgba(239,68,68,0.3) !important;
          color: #f87171 !important;
        }

        /* ── End button ── */
        .lk-img-end-btn {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: #dc2626 !important;
          border: none !important;
          border-radius: 8px !important;
          color: #ffffff !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          padding: 9px 28px !important;
          cursor: pointer !important;
          transition: background 0.2s !important;
        }
        .lk-img-end-btn:hover {
          background: #b91c1c !important;
        }

        /* ── Main video grid: fill container ── */
        .lk-main-grid {
          width: 100% !important;
          height: 100% !important;
        }
        .lk-main-grid .lk-grid-layout {
          width: 100% !important;
          height: 100% !important;
        }
        .lk-main-grid .lk-participant-tile {
          width: 100% !important;
          height: 100% !important;
          border-radius: 0 !important;
        }
        .lk-main-grid video {
          object-fit: cover !important;
          border-radius: 0 !important;
        }
        
        /* Screen share view - use contain to show full screen */
        .lk-screen-share-view video {
          object-fit: contain !important;
          background: #111 !important;
        }
        
        /* Screen share button active state */
        .lk-img-ctrl-btn[data-lk-source="screen_share"][data-lk-on="true"] {
          background: rgba(34, 197, 94, 0.15) !important;
          border-color: rgba(34, 197, 94, 0.3) !important;
          color: #22c55e !important;
        }

        /* ── Sidebar participant tiles ── */
        .lk-sidebar-tile {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          background: #2a2a2a;
          flex-shrink: 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
        }
        .lk-sidebar-tile .lk-participant-tile {
          width: 100% !important;
          height: 100% !important;
          border-radius: 0 !important;
        }
        .lk-sidebar-tile .lk-participant-metadata,
        .lk-sidebar-tile .lk-participant-name {
          display: none !important;
        }
        .lk-sidebar-tile video {
          object-fit: cover !important;
          border-radius: 0 !important;
        }

        /* Hide default livekit UI chrome we don't need */
        .lk-main-grid .lk-participant-metadata,
        .lk-main-grid .lk-participant-name,
        .lk-main-grid .lk-participant-placeholder {
          display: none !important;
        }
        .lk-main-grid .lk-focus-layout-container {
          gap: 0 !important;
        }

        /* ── Chat panel styling ── */
        .lk-chat-panel .lk-chat {
          background: transparent !important;
          border: none !important;
          flex: 1 !important;
          display: flex !important;
          flex-direction: column !important;
          min-height: 0 !important;
          height: 100% !important;
          overflow: hidden !important;
        }
        .lk-chat-panel .lk-chat-messages {
          flex: 1 !important;
          overflow-y: auto !important;
          padding: 12px !important;
          gap: 10px !important;
          display: flex !important;
          flex-direction: column !important;
          min-height: 0 !important;
        }
        /* keep the form always pinned and visible */
        .lk-chat-panel .lk-chat-form {
          flex-shrink: 0 !important;
          position: relative !important;
          z-index: 10 !important;
          padding: 12px !important;
          border-top: 1px solid rgba(255,255,255,0.06) !important;
          display: flex !important;
          gap: 8px !important;
          background: #1e1e1e !important;
          box-sizing: border-box !important;
          width: 100% !important;
          max-width: 100% !important;
          overflow: hidden !important;
        }
        .lk-chat-panel .lk-chat-entry {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.06) !important;
          border-radius: 10px !important;
          padding: 10px 12px !important;
        }
        .lk-chat-panel .lk-chat-entry-name {
          color: #D9A606 !important;
          font-size: 10px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          margin-bottom: 4px !important;
        }
        .lk-chat-panel .lk-chat-entry-text {
          color: rgba(255,255,255,0.85) !important;
          font-size: 13px !important;
          line-height: 1.5 !important;
        }
        .lk-chat-panel .lk-chat-form input {
          flex: 1 1 auto !important;
          min-width: 0 !important;
          width: 100% !important;
          background: rgba(255,255,255,0.07) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 8px !important;
          color: white !important;
          padding: 10px 12px !important;
          font-size: 13px !important;
          outline: none !important;
          box-sizing: border-box !important;
        }
        .lk-chat-panel .lk-chat-form input:focus {
          border-color: rgba(217,166,6,0.5) !important;
        }
        .lk-chat-panel .lk-chat-form button {
          background: #D9A606 !important;
          color: black !important;
          border: none !important;
          border-radius: 8px !important;
          padding: 10px 14px !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          cursor: pointer !important;
          flex-shrink: 0 !important;
          white-space: nowrap !important;
        }
        .lk-chat-panel .lk-chat-form button:hover {
          background: #F2B705 !important;
        }

        /* ── Chat toggle button active state ── */
        .lk-img-chat-active {
          background: rgba(217,166,6,0.15) !important;
          border-color: rgba(217,166,6,0.35) !important;
          color: #D9A606 !important;
        }
      `}</style>
    </div>
  );
}

/** Shows the dominant/active-speaker track in the large area, prioritizing screen shares */
function MainSpeakerVideo({ vendorLogo }: { vendorLogo: string | null }) {
  const participants = useParticipants();
  const cameraTracks = useTracks([Track.Source.Camera]);
  const screenShareTracks = useTracks([Track.Source.ScreenShare]);

  // Prioritize screen share tracks - show screen share if anyone is sharing
  const activeScreenShare = screenShareTracks.find(t => t.publication?.track);
  
  // For camera, pick dominant speaker or fall back to remote/local
  const dominant =
    participants.find((p) => p.isSpeaking && !p.isLocal) ??
    participants.find((p) => !p.isLocal) ??
    participants[0];

  const dominantCameraTrack = cameraTracks.find(
    (t) => dominant && t.participant.sid === dominant.sid
  ) ?? cameraTracks[0];

  // Use screen share if available, otherwise use camera
  const displayTrack = activeScreenShare ?? dominantCameraTrack;
  const isShowingScreenShare = !!activeScreenShare;

  return (
    <div className="w-full h-full relative bg-[#222] overflow-hidden">
      {displayTrack ? (
        <div className={`lk-main-grid w-full h-full ${isShowingScreenShare ? 'lk-screen-share-view' : ''}`}>
          <ParticipantTile trackRef={displayTrack} className="w-full h-full" />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm">
          Waiting for participants…
        </div>
      )}

      {/* Screen share indicator */}
      {isShowingScreenShare && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="bg-green-500/90 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <Monitor className="h-4 w-4" />
            <span className="text-sm font-medium">
              {activeScreenShare.participant.identity} is sharing screen
            </span>
          </div>
        </div>
      )}

      {/* BFA Logo — top left */}
      <div className="absolute top-5 left-5 z-20 pointer-events-none">
        <div className="relative h-14 w-36">
          <Image
            src="/logo.png"
            alt="BFA"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </div>

      {/* Vendor logo — top right (optional) */}
      {vendorLogo && (
        <div className="absolute top-5 right-5 z-20 pointer-events-none">
          <div className="relative h-10 w-10 rounded-full overflow-hidden border border-white/20">
            <Image src={vendorLogo} alt="Vendor" fill className="object-cover" />
          </div>
        </div>
      )}

      {/* Participant name — bottom left */}
      {displayTrack && (
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
            {isShowingScreenShare && <Monitor className="h-3.5 w-3.5 text-green-500" />}
            <span className="text-white text-sm font-medium">
              {displayTrack.participant.identity}
              {displayTrack.participant.isLocal && <span className="text-zinc-400 ml-1">(You)</span>}
            </span>
          </div>
        </div>
      )}

      {/* Mic status — bottom right */}
      {dominant && (
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-sm p-2 rounded-lg">
            <Mic className="h-4 w-4 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}

/** Stacked small tiles in the right sidebar */
function ParticipantSidebar() {
  const cameraTracks = useTracks([Track.Source.Camera]);
  const screenShareTracks = useTracks([Track.Source.ScreenShare]);
  const participants = useParticipants();

  return (
    <>
      {participants.map((p) => {
        const cameraTrack = cameraTracks.find((t) => t.participant.sid === p.sid);
        const screenTrack = screenShareTracks.find((t) => t.participant.sid === p.sid);
        const isSharing = !!screenTrack?.publication?.track;
        
        return (
          <div key={p.sid} className="lk-sidebar-tile">
            {cameraTrack ? (
              <ParticipantTile trackRef={cameraTrack} className="w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#333]">
                <span className="text-zinc-400 text-lg font-semibold">{p.identity?.[0]?.toUpperCase()}</span>
              </div>
            )}
            {/* Name overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none bg-gradient-to-t from-black/80 to-transparent p-2">
              <div className="flex items-center justify-between">
                <span className="text-white text-xs font-medium truncate">
                  {p.identity}
                  {p.isLocal && <span className="text-zinc-400 ml-1">(You)</span>}
                </span>
                <div className="flex items-center gap-1.5">
                  {isSharing && <Monitor className="h-3 w-3 text-green-500" />}
                  <Mic className={`h-3 w-3 flex-shrink-0 ${p.isMicrophoneEnabled ? 'text-white' : 'text-red-500'}`} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

import { useRoomContext } from "@livekit/components-react";

function TranscriptionOverlay() {
  const room = useRoomContext();
  const [lastTranscription, setLastTranscription] = useState<{ name: string; text: string } | null>(null);

  useEffect(() => {
    if (!room) return;

    const handleTranscription = (segments: TranscriptionSegment[], participant?: Participant) => {
      if (segments.length > 0) {
        const latest = segments[segments.length - 1];
        setLastTranscription({ name: participant?.identity || "User", text: latest.text });
        const timer = setTimeout(() => setLastTranscription(null), 5000);
        return () => clearTimeout(timer);
      }
    };

    room.on(RoomEvent.TranscriptionReceived, handleTranscription);
    return () => { room.off(RoomEvent.TranscriptionReceived, handleTranscription); };
  }, [room]);

  if (!lastTranscription) return null;

  return (
    <div className="bg-black/60 backdrop-blur-xl px-5 py-2 rounded-lg border border-white/10 max-w-[80%]">
      <p className="text-white text-sm">
        <span className="text-[#D9A606] font-semibold mr-2 text-xs uppercase tracking-wide">{lastTranscription.name}:</span>
        {lastTranscription.text}
      </p>
    </div>
  );
}
