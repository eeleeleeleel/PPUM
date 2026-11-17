import type { Metadata } from "next";
import Image from "next/image";
import SubpageHeader from "@/components/SubpageHeader";
import CopyButton from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Info — temps. studio",
};

const ADDRESS = "경기 파주시 회동길 508 1층 101호";
const LAT = 37.7227988;
const LNG = 126.6937556;

const mapLinks = [
  {
    label: "네이버 지도",
    icon: "/icons/naver-map.png",
    href: "https://naver.me/x1VvaJ1l",
  },
  {
    label: "카카오맵",
    icon: "/icons/kakao-map.png",
    href: `https://map.kakao.com/link/map/temps.,${LAT},${LNG}`,
  },
  {
    label: "Google Maps",
    icon: "/icons/google-maps.png",
    href: `https://www.google.com/maps/search/?api=1&query=${LAT},${LNG}`,
  },
  {
    // App-only link: opens TMAP navigation on phones with the app installed.
    label: "TMAP",
    icon: "/icons/tmap.png",
    href: `tmap://route?goalname=${encodeURIComponent("temps.")}&goalx=${LNG}&goaly=${LAT}`,
  },
];

const hours = [
  ["Studio", "연중무휴"],
  ["Café", "평일 12:00 – 18:30 / 주말 12:00 – 20:00"],
];

const business = [
  ["상호", "스튜디오 템스"],
  ["대표", "윤여솔"],
  ["사업자등록번호", "669-24-01764"],
];

const labelClass =
  "text-[13px] sm:text-sm font-bold uppercase tracking-[0.2em] text-foreground";
const textClass = "text-[13px] sm:text-sm text-foreground";

function Rows({ rows }: { rows: string[][] }) {
  return (
    <dd className={`grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 ${textClass}`}>
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <span className="font-semibold">{label}</span>
          <span>{value}</span>
        </div>
      ))}
    </dd>
  );
}

export default function InfoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SubpageHeader />

      <main className="flex flex-1 flex-col px-6 py-10 md:py-14">
        <h1 className="mx-auto mb-10 w-full max-w-3xl text-2xl sm:text-3xl font-bold uppercase tracking-[0.2em] text-foreground">
          Info
        </h1>

        {/* Bottom padding offsets the header + title so the details sit at screen center. */}
        <div className="mx-auto flex w-full max-w-3xl flex-1 items-center md:pb-[calc(8vh+6rem)]">
          <dl className="grid gap-10 md:grid-flow-col md:grid-cols-[auto_auto] md:grid-rows-[auto_1fr] md:gap-x-32">
            <div className="flex flex-col gap-3">
              <dt className={labelClass}>Address</dt>
              <dd className="flex flex-col gap-4">
                <p
                  className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${textClass}`}
                >
                  {ADDRESS}
                  <CopyButton text={ADDRESS} />
                </p>
                <div className="flex items-center gap-3">
                  {mapLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.label}에서 보기`}
                      title={link.label}
                      className="transition-opacity hover:opacity-70"
                    >
                      <Image
                        src={link.icon}
                        alt=""
                        width={32}
                        height={32}
                        className="rounded-[22%]"
                      />
                    </a>
                  ))}
                </div>
              </dd>
            </div>

            <div className="flex flex-col gap-3">
              <dt className={labelClass}>Hours</dt>
              <Rows rows={hours} />
            </div>

            <div className="flex flex-col gap-3">
              <dt className={labelClass}>Contact</dt>
              <dd className={textClass}>
                <a href="tel:010-3666-7673" className="hover:opacity-60">
                  010-3666-7673
                </a>
              </dd>
            </div>

            <div className="flex flex-col gap-3">
              <dt className={labelClass}>Business</dt>
              <Rows rows={business} />
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
}
