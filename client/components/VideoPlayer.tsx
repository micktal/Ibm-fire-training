import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Subtitles, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/languageContext";

interface VideoPlayerProps {
  url: string;
  title?: string;
  captionsVtt?: string;
  onComplete?: () => void;
}

export default function VideoPlayer({ url, title, captionsVtt, onComplete }: VideoPlayerProps) {
  const { lang } = useLanguage();
  const isEN = lang === "en";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [captionsBlobUrl, setCaptionsBlobUrl] = useState<string | null>(null);
  const [aiDisclaimerDismissed, setAiDisclaimerDismissed] = useState(false);

  useEffect(() => {
    if (!captionsVtt) return;
    const blob = new Blob([captionsVtt], { type: "text/vtt" });
    const blobUrl = URL.createObjectURL(blob);
    setCaptionsBlobUrl(blobUrl);
    return () => URL.revokeObjectURL(blobUrl);
  }, [captionsVtt]);

  // Sync captions visibility with track mode
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tracks = video.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = captionsOn ? "showing" : "hidden";
    }
  }, [captionsOn, captionsBlobUrl]);

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
        {!aiDisclaimerDismissed ? (
          <div
            className="flex flex-col items-center justify-center"
            style={{ background: "#0a0e1a", padding: "2rem 1.5rem", minHeight: "180px" }}
          >
            <div
              className="flex items-center gap-2 mb-3"
              style={{
                background: "rgba(15,98,254,0.15)",
                border: "1px solid rgba(15,98,254,0.35)",
                borderRadius: "2rem",
                padding: "0.35rem 0.9rem",
              }}
            >
              <Sparkles size={13} color="#78a9ff" />
              <span style={{ color: "#78a9ff", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em", fontFamily: "'IBM Plex Mono', monospace" }}>
                {isEN ? "AI-GENERATED CONTENT" : "CONTENU GÉNÉRÉ PAR IA"}
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.78rem", textAlign: "center", lineHeight: 1.5, marginBottom: "1.25rem", maxWidth: "280px" }}>
              {isEN
                ? "This video was produced using artificial intelligence. The fire safety procedures presented reflect IBM's official guidelines."
                : "Cette vidéo a été réalisée à l'aide de l'intelligence artificielle. Les procédures de sécurité incendie présentées sont conformes aux consignes officielles IBM."}
            </p>
            <button
              onClick={() => setAiDisclaimerDismissed(true)}
              style={{
                background: "#0043ce",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.55rem 1.4rem",
                fontSize: "0.78rem",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.03em",
              }}
            >
              {isEN ? "Understood — Watch video" : "Compris — Voir la vidéo"}
            </button>
          </div>
        ) : (
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
        )}
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
              {isEN ? "Watched" : "Visionné"}
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
          crossOrigin="anonymous"
        >
          {captionsBlobUrl && (
            <track
              kind="subtitles"
              src={captionsBlobUrl}
              srcLang={isEN ? "en" : "fr"}
              label={isEN ? "English" : "Français"}
              default
            />
          )}
        </video>
        {/* AI Disclaimer overlay — shown before first play */}
        {!aiDisclaimerDismissed && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: "rgba(10,14,26,0.93)", zIndex: 10, padding: "1.5rem" }}
          >
            <div
              className="flex items-center gap-2 mb-3"
              style={{
                background: "rgba(15,98,254,0.15)",
                border: "1px solid rgba(15,98,254,0.35)",
                borderRadius: "2rem",
                padding: "0.35rem 0.9rem",
              }}
            >
              <Sparkles size={13} color="#78a9ff" />
              <span style={{ color: "#78a9ff", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em", fontFamily: "'IBM Plex Mono', monospace" }}>
                {isEN ? "AI-GENERATED CONTENT" : "CONTENU GÉNÉRÉ PAR IA"}
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.78rem", textAlign: "center", lineHeight: 1.5, marginBottom: "1.25rem", maxWidth: "280px" }}>
              {isEN
                ? "This video was produced using artificial intelligence. The fire safety procedures presented reflect IBM's official guidelines."
                : "Cette vidéo a été réalisée à l'aide de l'intelligence artificielle. Les procédures de sécurité incendie présentées sont conformes aux consignes officielles IBM."}
            </p>
            <button
              onClick={() => setAiDisclaimerDismissed(true)}
              style={{
                background: "#0043ce",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.55rem 1.4rem",
                fontSize: "0.78rem",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.03em",
              }}
            >
              {isEN ? "Understood — Watch video" : "Compris — Voir la vidéo"}
            </button>
          </div>
        )}
        {/* Play overlay */}
        {!playing && aiDisclaimerDismissed && (
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
          <div className="flex items-center gap-3">
            {captionsVtt && (
              <button
                onClick={() => setCaptionsOn(!captionsOn)}
                className="transition-opacity hover:opacity-80"
                title={captionsOn ? (isEN ? "Hide subtitles" : "Masquer les sous-titres") : (isEN ? "Show subtitles" : "Afficher les sous-titres")}
                style={{ color: captionsOn ? "#0f62fe" : "rgba(255,255,255,0.4)" }}
              >
                <Subtitles size={16} />
              </button>
            )}
            <button
              onClick={() => videoRef.current?.requestFullscreen()}
              className="text-white hover:opacity-70 transition-opacity"
            >
              <Maximize2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
