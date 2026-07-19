// ─── Google Apps Script for SeedVault360 Lead Capture ───
//
// SETUP INSTRUCTIONS:
//
// 1. Create a new Google Sheet
// 2. Name the first sheet "Leads"
// 3. Add these headers in Row 1:
//    A1: Timestamp | B1: Name | C1: Company | D1: Email | E1: Phone | F1: Type
//
// 4. Go to Extensions → Apps Script
// 5. Paste this entire file into the script editor
// 6. Click Deploy → New Deployment
//    - Type: Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 7. Copy the Web App URL
// 8. Paste it into app.js as the GOOGLE_SCRIPT_URL value
//
// ─────────────────────────────────────────────────────────

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.company || '',
      data.email || '',
      data.phone || '',
      data.userType || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('SeedVault360 Lead Capture is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
