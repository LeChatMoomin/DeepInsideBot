
function SendUnknownCommandResponse(chat_id){
  SendResponse(chat_id, "Команда не распознана");
}

function SendHelpInfoResponse(chat_id){
  SendResponse(chat_id, "Памагити");
}
 
function SendResponse(chat_id, text, keyBoard){
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: String(text),
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyBoard),
      disable_web_page_preview: true
    }
  };
  UrlFetchApp.fetch("https://api.telegram.org/bot" + BotToken + '/', data);
}