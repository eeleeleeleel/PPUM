// temps. 문의 폼 → 메일 발송 + 구글 캘린더 기록
// tempsmake@gmail.com 계정의 Apps Script 프로젝트에 붙여넣어 웹 앱으로 배포한다.
// 스크립트 속성(프로젝트 설정 → 스크립트 속성)에 SECRET 값을 넣고,
// 사이트의 INQUIRY_SECRET 환경변수와 같은 값으로 맞춘다.

const RECIPIENTS = ["tempsmake@gmail.com", "eelobjects@gmail.com"];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("SECRET");
    if (!secret || data.secret !== secret) {
      return json({ ok: false, error: "unauthorized" });
    }

    const drink =
      data.drinkOrder === "yes" ? `O (${data.drinkTime})` : "X";
    const title = `[문의] ${data.name} · ${data.guests}명 · 음료 ${drink}`;
    const body = [
      `이름: ${data.name}`,
      `연락처: ${data.contact}`,
      `희망 날짜: ${data.date}`,
      `인원: ${data.guests}명`,
      `음료 주문: ${drink}`,
      "",
      "촬영 정보:",
      data.message || "(없음)",
    ].join("\n");

    const email = /\S+@\S+\.\S+/.test(data.contact) ? data.contact : undefined;
    MailApp.sendEmail({
      to: RECIPIENTS.join(","),
      subject: `${title} · ${data.date}`,
      body,
      replyTo: email,
    });

    const [y, m, d] = data.date.split("-").map(Number);
    CalendarApp.getDefaultCalendar().createAllDayEvent(
      title,
      new Date(y, m - 1, d),
      { description: body },
    );

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
