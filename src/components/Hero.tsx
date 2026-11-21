import { profile } from "@/data/resume";

export function Hero() {
  return (
    <section
      id="whoami"
      aria-labelledby="name"
      className="mt-10 border border-rule bg-panel sm:mt-16"
    >
      <div className="flex items-center justify-between border-b border-rule px-4 py-2 font-mono text-xs text-muted sm:px-6">
        <span>{profile.handle}@portfolio: ~</span>
        <span aria-hidden>zsh</span>
      </div>

      <div className="px-4 pt-6 pb-8 sm:px-8 sm:pt-8 sm:pb-10">
        <p aria-hidden className="font-mono text-sm text-muted">
          $ <span className="typed text-text">whoami</span>
        </p>

        <h1
          id="name"
          className="mt-5 font-display text-[clamp(2.1rem,8vw,4.25rem)] leading-[0.95] font-bold tracking-[-0.04em] uppercase [font-stretch:112.5%]"
        >
          {profile.name.split(" ").map((word) => (
            <span key={word} className="block">
              {word}
            </span>
          ))}
        </h1>

        <p className="mt-3 font-mono text-sm text-muted">
          <span aria-hidden># </span>aka {profile.nickname.toLowerCase()}
        </p>
        <p className="mt-4 font-mono text-sm text-amber">{profile.role}</p>
        <p className="mt-3 max-w-[56ch] text-[1.05rem] leading-relaxed">
          {profile.summary}
          <span aria-hidden className="cursor" />
        </p>

        <div className="mt-8 flex flex-col gap-3 font-mono text-sm sm:flex-row">
          <a
            href={profile.resume}
            download
            className="bg-accent px-4 py-2.5 text-center font-medium text-on-accent transition-opacity hover:opacity-85"
          >
            Download resume (PDF)
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="border border-rule px-4 py-2.5 text-center transition-colors hover:border-teal hover:text-teal"
          >
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}
