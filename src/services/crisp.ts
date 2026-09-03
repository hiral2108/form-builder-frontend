interface CrispUserData {
  email: string | null;
  nickname: string | null;
  shop_url: string;
  plan_id: number;
  unique_id: string;
  app_name: string;
}

export function loadCrisp(user: CrispUserData) {
  if (!user.email && !user.nickname) {
    // Expected on early mount before the account/user data has loaded — not worth a warning.
    return;
  }

  if ((window as any).$crisp) {
    // Already loaded — just update session data instead of silently bailing
    updateCrispSession(user);
    return;
  }

  (window as any).$crisp = [];
  (window as any).CRISP_WEBSITE_ID = "6ff4b664-ec0f-42b1-9110-48b91f9f6980";

  if (user.unique_id) {
    (window as any).CRISP_TOKEN_ID = user.unique_id;
  }

  const s = document.createElement("script");
  s.src = "https://client.crisp.chat/l.js";
  s.async = true;
  s.onload = () => console.log("[Crisp] Script loaded successfully");
  s.onerror = (e) => console.error("[Crisp] Script failed to load:", e);
  document.head.appendChild(s);

  updateCrispSession(user);
}

function updateCrispSession(user: CrispUserData) {
  const $crisp = (window as any).$crisp;
  if (user.email) $crisp.push(["set", "user:email", [user.email]]);
  if (user.nickname) $crisp.push(["set", "user:nickname", [user.nickname]]);
  $crisp.push([
    "set",
    "session:data",
    [
      [
        ["Shop-URL", user.shop_url || ""],
        ["App-Name", user.app_name || "QDP"],
        ["Plan", String(user.plan_id || 0)],
      ],
    ],
  ]);
}
