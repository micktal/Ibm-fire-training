import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

interface VideoPlayerProps {
  url: string;
  title?: string;
  onComplete?: () => void;
}

export default function VideoPlayer({ url, title, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Detect if URL is YouTube/Vimeo embed
  const isYoutube = url.includes("youtube.com") || url.includes("youtu.be");
  const isVimeo = url.includes("vimeo.com");

  const getEmbedUrl = () => {
    if (isYoutube) {
      const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
      const id = match?.[1];
      return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
    }
    if (isVimeo) {
      const match = url.match(/vimeo\.com\/(\d+)/);
      const id = match?.[1];
      return `https://player.vimeo.com/video/${id}`;
    }
    return url;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(pct);
    if (pct >= 90 && !completed) {
      setCompleted(true);
      onComplete?.();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pct * videoRef.current.duration;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // Embed (YouTube/Vimeo)
  if (isYoutube || isVimeo) {
    return (
      <div className="rounded-lg overflow-hidden" style={{ border: "1.5px solid #e4e7f0" }}>
        {title && (
          <div
            className="px-4 py-2.5 flex items-center gap-2"
            style={{ background: "#0043ce", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Play size={13} color="rgba(255,255,255,0.8)" />
            <span className="text-xs font-semibold text-white">{title}</span>
          </div>
        )}
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <iframe
            src={getEmbedUrl()}
            title={title || "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>
      </div>
    );
  }

  // Native video player
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: "1.5px solid #e4e7f0", background: "#0a0e1a" }}>
      {title && (
        <div
          className="px-4 py-2.5 flex items-center gap-2"
          style={{ background: "#0043ce", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Play size={13} color="rgba(255,255,255,0.8)" />
          <span className="text-xs font-semibold text-white">{title}</span>
          {completed && (
            <span
              className="ml-auto font-mono text-xs px-2 py-0.5 rounded-full"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#6fdc8c",
                background: "rgba(25,128,56,0.2)",
                border: "1px solid rgba(25,128,56,0.3)",
              }}
            >
              Visionné
            </span>
          )}
        </div>
      )}

      {/* Video */}
      <div className="relative" style={{ background: "#0a0e1a" }}>
        <video
          ref={videoRef}
          src={url}
          className="w-full"
          style={{ maxHeight: "320px", display: "block" }}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
          onEnded={() => { setPlaying(false); setCompleted(true); onComplete?.(); }}
          muted={muted}
        />
        {/* Play overlay */}
        {!playing && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center transition-opacity hover:opacity-90"
            style={{ background: "rgba(0,0,0,0.35)" }}
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: "56px", height: "56px", background: "#0043ce", boxShadow: "0 4px 20px rgba(0,67,206,0.5)" }}
            >
              <Play size={22} color="#fff" fill="#fff" style={{ marginLeft: "3px" }} />
            </div>
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="px-4 py-3" style={{ background: "#111827" }}>
        {/* Progress bar */}
        <div
          className="w-full rounded-full cursor-pointer mb-3"
          style={{ height: "4px", background: "rgba(255,255,255,0.15)" }}
          onClick={handleSeek}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progress}%`, background: "#0f62fe" }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="text-white hover:opacity-70 transition-opacity">
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button onClick={() => setMuted(!muted)} className="text-white hover:opacity-70 transition-opacity">
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <span
              className="font-mono text-xs"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {videoRef.current ? formatTime(videoRef.current.currentTime) : "0:00"} / {formatTime(duration)}
            </span>
          </div>
          <button
            onClick={() => videoRef.current?.requestFullscreen()}
            className="text-white hover:opacity-70 transition-opacity"
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
