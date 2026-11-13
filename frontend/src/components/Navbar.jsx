import Brand from "./Brand"
import Icon from "./Icon"
import { programs } from "../data"

export default function Navbar({
  page,
  profile,
  accountLoading,
  nickname,
  navigate,
}) {
  return (
    <header className="topbar">
      <button className="brand-button" onClick={() => navigate("beranda")}>
        <Brand />
      </button>
      <nav aria-label="Menu utama">
        {(
          profile
            ? [
                ["beranda", "Beranda"],
                ["journey", "My Journey"],
                ["panduan", "Panduan"],
              ]
            : [["beranda", "Beranda"]]
        ).map(([id, label]) => (
          <button
            className={page === id ? "active" : ""}
            aria-current={page === id ? "page" : undefined}
            key={id}
            onClick={() => navigate(id)}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="profile-wrap">
        <button
          className="profile-trigger"
          disabled={accountLoading}
          onClick={() => navigate(profile ? "profil" : "login")}
        >
          <span className="profile-avatar">
            {nickname ? (
              nickname.charAt(0).toUpperCase()
            ) : (
              <Icon name="user" size={18} />
            )}
          </span>
          <span>
            <strong>{nickname || "Profil saya"}</strong>
            <small>
              {profile
                ? programs.find((program) => program.id === profile?.program)
                    ?.name || "Lengkapi profil"
                : "Masuk ke HaloMaba"}
            </small>
          </span>
          <Icon name="arrow" size={15} />
        </button>
      </div>
    </header>
  )
}
