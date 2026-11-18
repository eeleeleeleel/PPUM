import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import SubpageHeader from "@/components/SubpageHeader";

export const metadata: Metadata = {
  title: "Guidelines — temps. studio",
};

// "\n" in text marks a line break on phones only; "|" breaks on every screen.
type Item = { text: string };
// `plain` drops the leading dash, for directions rather than rules.
// Phone photos are 1001×1334 unless a size is given.
type Photo = { src: string; alt: string; width?: number; height?: number };
type Group = {
  title: string;
  items: Item[];
  plain?: boolean;
  photos?: Photo[];
};
type Section = { id: string; title: string; groups: Group[] };

// Sections run in visit order. Add Parking / Check-in / How to use /
// Check-out here as their content arrives; the side menu picks them up.
const sections: Section[] = [
  {
    id: "notice",
    title: "Notice",
    groups: [
      {
        title: "이용 시간",
        items: [
          {
            text: "예약된 시간 내에서 사용 가능합니다.\n준비와 정리 시간도 포함됩니다.",
          },
          {
            text: "이용 시간이 초과되면 추가 요금이 발생합니다.",
          },
          {
            text: "시간 연장은 미리 문의해 주세요.\n예약 상황에 따라 제한될 수 있습니다.",
          },
        ],
      },
      {
        title: "공간 이용",
        items: [
          {
            text: "스튜디오에 있는 가구, 조명, 소품은\n모두 자유롭게 사용하실 수 있습니다.",
          },
          {
            text: "가구는 끌지 말고 들어서 옮겨 주세요.\n바닥이 긁힐 수 있습니다.",
          },
          {
            text: "전력 소모가 큰 장비는 미리 문의해 주세요.\n여러 장비를 동시에 사용하면 차단기가 내려갈 수 있습니다.",
          },
          {
            text: "벽면과 가구에 테이프, 핀, 못 등은 사용할 수 없습니다.",
          },
        ],
      },
      {
        title: "이용 시 유의사항",
        items: [
          {
            text: "2층 사무실을 위해 음악은 적당한 볼륨으로 틀어 주세요.",
          },
          {
            text: "드라이아이스, 스모그 등 연기 장비는 사용이 제한됩니다.\n필요 시 직원에게 문의해 주세요.",
          },
          {
            text: "야외 촬영은 안내드린 구역에서만 가능합니다.\n그 밖의 장소에서 생긴 문제에 대해서는 책임지지 않습니다.",
          },
        ],
      },
      {
        title: "정리 및 원상 복구",
        items: [
          {
            text: "일반·음식물 쓰레기는 직접 분리 배출해 주세요.\n종량제 봉투는 제공되지 않으니 미리 준비해 주세요.|쓰레기는 건물 입구 앞에 있는 나무 아래에 두시면 됩니다.",
          },
          { text: "사용한 가구와 소품은 제자리에 정리해 주세요." },
          { text: "바닥에 붙인 테이프는 깨끗이 떼어 주세요." },
          {
            text: "오염이나 파손이 생기면 정비 비용이 청구됩니다.",
          },
        ],
      },
    ],
  },
  {
    id: "check-in",
    title: "Check-in",
    groups: [
      {
        title: "건물 입구",
        plain: true,
        items: [
          { text: "회동길 508, 1층" },
          { text: "스크린 간판 옆 문으로 들어오시면 됩니다." },
        ],
        photos: [
          { src: "/guidelines/entrance-1.jpg", alt: "건물 앞 스크린 간판" },
          { src: "/guidelines/entrance-2.jpg", alt: "스크린 간판 옆 출입문" },
        ],
      },
      {
        title: "스튜디오 입구",
        plain: true,
        items: [
          { text: "건물 1층 우측에 문이 있습니다." },
          {
            text: "촬영 장비, 짐은 폴딩 도어 앞에 두고 사용하실 수 있습니다.",
          },
        ],
        photos: [
          { src: "/guidelines/studio-1.jpg", alt: "스튜디오 폴딩 도어" },
          { src: "/guidelines/studio-2.jpg", alt: "스튜디오 출입문" },
        ],
      },
    ],
  },
  {
    id: "parking",
    title: "Parking",
    groups: [
      {
        title: "주차 가능 구역",
        plain: true,
        items: [
          { text: "스크린 간판 옆 지하 주차장으로 들어오시면 됩니다." },
          { text: "카페 앞 노란 실선에도 주차 가능합니다." },
        ],
        photos: [
          { src: "/guidelines/parking-1.jpg", alt: "지하 주차장 입구" },
          {
            src: "/guidelines/parking-2.jpg",
            alt: "카페 앞 노란 실선 주차 구역",
          },
        ],
      },
      {
        title: "지하 주차장 지정석",
        plain: true,
        items: [{ text: "빨간 점으로 표시된 자리에 주차해 주세요." }],
        photos: [
          {
            src: "/guidelines/parking-spots-v3.png",
            alt: "지하 주차장 지정석 위치 약도",
            width: 582,
            height: 727,
          },
        ],
      },
    ],
  },
  {
    id: "how-to-use",
    title: "How to Use",
    groups: [
      {
        title: "에어컨 사용법",
        plain: true,
        items: [
          {
            text: "ON 버튼(적색 스위치 3개)을 누르면 전원이 켜집니다.\n컨트롤러의 운전 버튼을 누른 후 사용하시면 됩니다.",
          },
          { text: "사용 후에는 OFF 버튼(녹색 스위치 3개)을 눌러 주세요." },
        ],
        photos: [
          { src: "/guidelines/aircon-1.jpg", alt: "에어컨 전원 ON·OFF 스위치" },
          { src: "/guidelines/aircon-2.jpg", alt: "에어컨 컨트롤러" },
        ],
      },
      {
        title: "카페 조명 스위치",
        plain: true,
        items: [
          { text: "사진에 있는 스위치를 전부 켜주시면 됩니다." },
          { text: "코드는 뽑지 말아주세요." },
        ],
        photos: [
          {
            src: "/guidelines/cafe-light-1.jpg",
            alt: "카페 조명 스위치 1",
            width: 791,
            height: 1053,
          },
          {
            src: "/guidelines/cafe-light-2.jpg",
            alt: "카페 조명 스위치 2",
            width: 790,
            height: 1053,
          },
          {
            src: "/guidelines/cafe-light-3.jpg",
            alt: "카페 조명 스위치 3",
            width: 791,
            height: 1053,
          },
        ],
      },
      {
        title: "블루투스 스피커",
        plain: true,
        items: [
          { text: "스피커 본체의 전원 버튼을 누릅니다." },
          {
            text: "본체 뒷면의 블루투스 버튼을 LED가 파란색으로 깜빡일 때까지\n길게 누릅니다.",
          },
          {
            text: "스마트폰의 블루투스 설정에서\n“VIFA_BT01638F”를 선택해 연결합니다.",
          },
        ],
        photos: [
          {
            src: "/guidelines/speaker-1.jpg",
            alt: "스피커 본체 앞면 버튼",
            width: 791,
            height: 1053,
          },
          {
            src: "/guidelines/speaker-2.jpg",
            alt: "스피커 뒷면 전원·블루투스 버튼",
            width: 791,
            height: 1053,
          },
        ],
      },
    ],
  },
];

const groupId = (section: Section, index: number) =>
  `${section.id}-${index + 1}`;

const navLinkClass = "text-foreground transition-opacity hover:opacity-60";

export default function GuidelinesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SubpageHeader />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 md:py-14">
        <h1 className="mb-10 text-2xl sm:text-3xl font-bold uppercase tracking-[0.2em] text-foreground md:mb-14 md:ml-[calc(180px+4rem)]">
          Guidelines
        </h1>

        {/* Phones: the section menu becomes a sticky, swipeable bar. */}
        <nav className="sticky top-[7vh] z-20 -mx-6 mb-8 bg-background sm:top-[9vh] md:hidden">
          <ul className="flex h-12 items-center justify-between gap-2 whitespace-nowrap px-6 text-[11px] font-bold uppercase tracking-[0.04em] min-[360px]:gap-3 min-[360px]:text-xs min-[360px]:tracking-[0.08em]">
            {sections.map((section) => (
              <li key={section.id} className="shrink-0">
                <a href={`#${section.id}`} className={navLinkClass}>
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:grid md:grid-cols-[180px_1fr] md:gap-16">
          <nav aria-label="Guidelines sections" className="hidden md:block">
            <ul className="sticky top-[calc(9vh+2.5rem)] flex flex-col gap-5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`text-sm font-bold uppercase tracking-[0.2em] ${navLinkClass}`}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                aria-label={section.title}
                className={`scroll-mt-[calc(7vh+45px)] sm:scroll-mt-[calc(9vh+45px)] pb-16 md:scroll-mt-[calc(9vh-2px)] ${
                  index > 0 ? "border-t border-foreground/15 pt-16" : ""
                }`}
              >
                <h2 className="mb-8 text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] text-foreground">
                  {section.title}
                </h2>

                {section.groups.length === 0 && (
                  <p className="text-[13px] sm:text-sm text-foreground/50">
                    준비 중입니다.
                  </p>
                )}

                <div className="flex flex-col gap-10">
                  {section.groups.map((group, i) => (
                    <div
                      key={groupId(section, i)}
                      id={groupId(section, i)}
                      className="flex scroll-mt-[calc(7vh+45px)] sm:scroll-mt-[calc(9vh+45px)] flex-col gap-3 md:scroll-mt-[calc(9vh-2px)]"
                    >
                      <h3 className="text-[15px] sm:text-base font-bold text-foreground">
                        {group.title}
                      </h3>
                      {group.items.length === 0 && (
                        <p className="text-[13px] sm:text-sm text-foreground/50">
                          준비 중입니다.
                        </p>
                      )}
                      <ul className="flex flex-col gap-2 break-keep text-[13px] sm:text-sm leading-relaxed text-foreground">
                        {group.items.map((item) => (
                          <li key={item.text} className="flex gap-2.5">
                            {!group.plain && (
                              <span aria-hidden className="text-foreground/40">
                                –
                              </span>
                            )}
                            <span>
                              {item.text.split("|").map((block, b) => (
                                <Fragment key={b}>
                                  {b > 0 && <br />}
                                  {block.split("\n").map((line, i) => (
                                    <Fragment key={i}>
                                      {i > 0 && (
                                        <>
                                          {" "}
                                          <br className="sm:hidden" />
                                        </>
                                      )}
                                      {line}
                                    </Fragment>
                                  ))}
                                </Fragment>
                              ))}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {group.photos && (
                        <div
                          className={`mb-14 mt-3 grid gap-2 md:gap-3 ${
                            group.photos.length === 1
                              ? "mx-auto max-w-sm grid-cols-1 md:mx-0"
                              : group.photos.length === 3
                                ? "max-w-2xl grid-cols-3"
                                : "max-w-xl grid-cols-2"
                          }`}
                        >
                          {group.photos.map((photo) => (
                            <Image
                              key={photo.src}
                              src={photo.src}
                              alt={photo.alt}
                              width={photo.width ?? 1001}
                              height={photo.height ?? 1334}
                              sizes="(max-width: 768px) 75vw, 384px"
                              className="h-auto w-full"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
