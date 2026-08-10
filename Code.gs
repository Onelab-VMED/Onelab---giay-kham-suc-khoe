/**
 * CODE.GS — Backend nhận dữ liệu từ "Giấy khám sức khỏe - Mẫu số 03"
 * Mỗi lượt gửi từ form được ghi thành 1 dòng vào sheet "DATA_M03".
 *
 * CÁCH DÙNG: xem hướng dẫn deploy đi kèm.
 */

var SHEET_NAME = "DATA_M03";

var HEADERS = [
  "STT","Ngày lập phiếu","Họ và tên","Giới tính","Ngày tháng năm sinh","Tuổi",
  "Số CCCD/Hộ chiếu/Mã định danh","Cấp ngày","Nơi cấp",
  "Dân tộc","Đối tượng","Nguồn chi trả",
  "Nhóm máu","Yếu tố Rh",
  "Tỉnh/Thành (nơi ở)","Phường/Xã (nơi ở)","Số nhà/thôn/xóm",
  "Nghề nghiệp","Nơi làm việc, học tập","Lý do khám sức khỏe",
  "Tiền sử gia đình - Có bệnh không","Tiền sử gia đình - Tên bệnh cụ thể",
  "1. Có bệnh hay bị thương trong 5 năm qua",
  "2. Có bệnh thần kinh hay bị thương ở đầu",
  "3. Bệnh mắt hoặc giảm thị lực (trừ trường hợp đeo kính thuốc)",
  "4. Bệnh ở tai, giảm sức nghe hoặc thăng bằng",
  "5. Bệnh ở tim, hoặc nhồi máu cơ tim, các bệnh tim mạch khác",
  "6. Phẫu thuật can thiệp tim - mạch (thay van, bắc cầu nối, tạo hình mạch, máy tạo nhịp, đặt stent mạch, ghép tim)",
  "7. Tăng huyết áp",
  "8. Khó thở",
  "9. Bệnh phổi, hen, khí phế thũng, viêm phế quản mạn tính",
  "10. Bệnh thận, lọc máu",
  "11. Nghiện rượu, bia",
  "12. Đái tháo đường hoặc kiểm soát tăng đường huyết",
  "13. Bệnh tâm thần",
  "14. Mất ý thức, rối loạn ý thức",
  "15. Ngất, chóng mặt",
  "16. Bệnh tiêu hóa",
  "17. Rối loạn giấc ngủ, ngừng thở khi ngủ, ngủ rũ ban ngày, ngáy to",
  "18. Tai biến mạch máu não hoặc liệt",
  "19. Bệnh hoặc tổn thương cột sống",
  "20. Sử dụng rượu thường xuyên, liên tục",
  "21. Sử dụng ma túy và chất gây nghiện",
  "22. Bệnh khác (ghi rõ)",
  "Bệnh khác - Tên bệnh cụ thể",
  "Đang điều trị bệnh gì không", "Đang điều trị - Chi tiết (bệnh, thuốc, liều lượng)",
  "Tiền sử thai sản", "Tiền sử thai sản - Chi tiết"
];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var row = body.row;
    var sheet = getSheet_();

    var stt = sheet.getLastRow(); // header ở dòng 1 nên số này = STT kế tiếp
    row[0] = stt;

    while (row.length < HEADERS.length) row.push("");

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ ok: true, stt: stt }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, msg: "Mau so 03 API dang hoat dong" })
  ).setMimeType(ContentService.MimeType.JSON);
}
