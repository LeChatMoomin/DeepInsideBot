
const TechLogSheetId = "1CID8CmKOpVs3UYRVYtWgHsTqQeB59gTtb3KJspcQXkQ";
const Url = "https://script.google.com/macros/s/AKfycbyIgig3Iml3Z6qTsUEy6Fr0QWbadFQVGnKI_WsDL3wpGbe-zoBr6XvRGd6vH5Sybz8cug/exec";
const BotToken = "7426940346:AAFlm0c-H3GYbBO7PP0QZkUmBDop5Dfl-lw";

function doPost(data) {
  try {
    DeepBot.DoPost(data);
  } catch (e) {
    Logger = BetterLog.useSpreadsheet(TechLogSheetId);
    e = (typeof e === 'string') ? new Error(e) : e;
    Logger.severe('%s: %s (line %s, file "%s"). Stack: "%s" . While processing %s.',e.name||'', 
                e.message||'', e.lineNumber||'', e.fileName||'', e.stack||'', processingMessage||'');
  }
}

function SetWebHook() {
  let response = UrlFetchApp.fetch("https://api.telegram.org/bot"+BotToken+"/setWebhook?url=" + Url);
  console.log(response.getContentText());
}