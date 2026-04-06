import { useLocation, useNavigate } from "react-router-dom";
import { Home, LayoutGrid } from "lucide-react";
import { useUser } from "@/lib/userContext";
import { useLanguage } from "@/lib/languageContext";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  exact?: boolean;
}

const BASE_ITEMS: NavItem[] = [
  {
    label: "home",
    icon: <Home size={20} />,
    path: "/",
    exact: true,
  },
  {
    label: "modules",
    icon: <LayoutGrid size={20} />,
    path: "/hub",
  },
];

// Hidden on welcome and form pages
const HIDDEN_PATHS = ["/", "/form"];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, totalCompleted, globalScore } = useUser();
  const { lang } = useLanguage();

  const ITEMS: NavItem[] = BASE_ITEMS.map((item) => ({
    ...item,
    label: item.label === "home" ? (lang === "en" ? "Home" : "Accueil") : (lang === "en" ? "Modules" : "Modules"),
  }));

  // Don't show on welcome/form/fiche screens
  if (HIDDEN_PATHS.includes(location.pathname)) return null;
  if (location.pathname.startsWith("/fiche") || location.pathname === "/fiches") return null;

  const isActive = (item: NavItem) =>
    item.exact
      ? location.pathname === item.path
      : location.pathname === item.path || location.pathname.startsWith(item.path + "/");

  // Derive current module context from URL
  const isOnModule = location.pathname.startsWith("/module/");
  const moduleId = isOnModule ? location.pathname.split("/module/")[1] : null;

  return (
    <>
      {/* Spacer so content doesn't hide behind bar */}
      <div style={{ height: "72px" }} />

      <nav
        className="fixed bottom-0 left-0 right-0 z-40"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
          fontFamily: "'IBM Plex Sans', sans-serif",
        }}
      >
        {/* Progress bar — thin line at very top of nav */}
        <div style={{ height: "2px", background: "#f0f2f8", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${(totalCompleted / 14) * 100}%`,
              background: "linear-gradient(90deg, #0043ce, #0f62fe)",
              transition: "width 0.5s ease",
            }}
          />
        </div>

        <div
          className="flex items-stretch"
          style={{ height: "70px", maxWidth: "640px", margin: "0 auto", padding: "0 8px" }}
        >
          {/* Nav items */}
          {ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex-1 flex flex-col items-center justify-center gap-1 transition-all"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: active ? "#0043ce" : "#9aa0b8",
                  padding: "8px 0",
                  position: "relative",
                }}
              >
                {/* Active indicator dot */}
                {active && (
                  <div
                    style={{
                      position: "absolute",
                      top: "6px",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#0043ce",
                    }}
                  />
                )}
                <div
                  style={{
                    transform: active ? "scale(1.12)" : "scale(1)",
                    transition: "transform 0.2s, color 0.2s",
                  }}
                >
                  {item.icon}
                </div>
                <span
                  className="font-semibold"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.04em",
                    color: active ? "#0043ce" : "#9aa0b8",
                    textTransform: "uppercase",
                    transition: "color 0.2s",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Score chip — right side */}
          {user && (
            <div
              className="flex items-center gap-2 px-3 my-3 rounded-xl"
              style={{
                background: totalCompleted > 0 ? "rgba(0,67,206,0.07)" : "#f5f6f8",
                border: `1px solid ${totalCompleted > 0 ? "rgba(0,67,206,0.15)" : "#e4e7f0"}`,
                minWidth: "90px",
              }}
            >
              <div className="flex flex-col items-center w-full">
                <span
                  className="font-mono font-bold"
                  style={{
                    fontSize: "15px",
                    color: totalCompleted > 0 ? "#0043ce" : "#c0c4d4",
                    fontFamily: "'IBM Plex Mono', monospace",
                    lineHeight: 1.1,
                  }}
                >
                  {totalCompleted}/14
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    color: "#9aa0b8",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {globalScore}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Safe area for phones with home bar */}
        <div style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
      </nav>
    </>
  );
}
