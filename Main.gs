const BotToken = "7426940346:AAFlm0c-H3GYbBO7PP0QZkUmBDop5Dfl-lw";
const SheetId = "1-Y_acjNjPRVWkf80Dt8VmN5IfPq-XIa3v_Bgj6qrf2g";
const MonthNames = {
  1 : "Январь",
  2 : "Февраль",
  3 : "Март",
  4 : "Апрель",
  5 : "Май",
  6 : "Июнь",
  7 : "Июль",
  8 : "Август",
  9 : "Сентябрь",
  10 : "Октябрь",
  11 : "Ноябрь",
  12 : "Декабрь"
}

const State = {
  Idle : "Idle",
  CountInsertion : "CountInsertion",
  SourceInsertion : "SourceInsertion",
  AdditionalInfoInsertion : "AdditionalInfoInsertion",
  Confirmation : "Confirmation",
}

const DataType = {
  State : "State",
  Count : "Count",
  Source : "Source",
  Info : "Info"
}

const DataAdress = {
  "State" : [1,1],
  "Count" : [1,2],
  "Source" : [1,3],
  "Info" : [1,4]
}

const GuestSource = {
  Yandex : "Yandex",
  KudaGo : "KudaGo",
  Beriozka : "Beriozka",
  Friends : "Friends",
  Moscow : "Moscow",
  Subscribed : "Subscribed",
  Blogger : "Blogger",
  Telegram : "Telegram",
  DontKnow : "DontKnow",
  Internet : "Internet",
}

const GuestSourceLocalized = {
  "Yandex" : "Яндекс Афиша",
  "KudaGo" : "KudaGo",
  "Beriozka" : "Beriozka",
  "Friends" : "От друзей",
  "Moscow" : "Были в Москве",
  "Subscribed" : "Подписаны на Марию",
  "Blogger" : "Блогер",
  "Telegram" : "Тг канал",
  "DontKnow" : "Не помнят",
  "Internet" : "Нашли в Интернете",
}

const AddNewGuestKeyboard = {
  "inline_keyboard" : [
    [
      {
        "text" : "Отметить новых гостей", "callback_data": "AddGuests"
      }
    ]
  ]
}

const AddGuestKeyboard = {
  "inline_keyboard" : [
    [
      {
        "text" : "Отметить гостей", "callback_data": "AddGuests"
      }
    ]
  ]
}

const CountKeyboard = {
  "inline_keyboard" : [
    [{"text" : "1", "callback_data" : "1"}, {"text" : "2", "callback_data" : "2"}],
    [{"text" : "3", "callback_data" : "3"}, {"text" : "4", "callback_data" : "4"}],
  ]
}

const SourceKeyboard = {
  "inline_keyboard" : [
    [{"text" : "Яндекс Афиша", "callback_data" : "Yandex"}, {"text" : "KudaGo", "callback_data" : "KudaGo"}],
    [{"text" : "От друзей", "callback_data" : "Friends"}, {"text" : "Beriozka", "callback_data" : "Beriozka"}],
    [{"text" : "Были в Москве", "callback_data" : "Moscow"}, {"text" : "Блогер", "callback_data" : "Blogger"}],
    [{"text" : "Подписчики Марии", "callback_data" : "Subscribed"}, {"text" : "Тг канал", "callback_data" : "Telegram"}],
    [{"text" : "Нашли в Интернете", "callback_data" : "Internet"}, {"text" : "Не помнят", "callback_data" : "DontKnow"}],
  ]
}

const AdditionalInfoKeyboard = {
  "inline_keyboard" : [
     [{"text" : "Не помнят", "callback_data" : "DontKnow"}],
  ]
}

const ConfirmationKeyboard = {
  "inline_keyboard" : [
    [{"text" : "Подтвердить", "callback_data" : "Confirm"}, {"text" : "Отмена", "callback_data" : "Cancel"}],
  ]
}

function doPost(income) {
  let contents = JSON.parse(income.postData.contents); 
  let text;
  let chat_id;
  let username;
  if (contents.hasOwnProperty("callback_query")){
    text = contents.callback_query.data;
    chat_id = contents.callback_query.from.id;
    username = contents.callback_query.from.username;
  }else{
    text = contents.message.text;
    chat_id = contents.message.chat.id
    username =  contents.message.from.username;
  }
  if(text == "AddGuests"){
    ClearTechSheet();
  }
  if(text == "/start"){
    SendResponse(chat_id, "Рад знакомству!\n\nСейчас вы уже можете отмечать гостей🙌", AddGuestKeyboard);
    ClearTechSheet();
  }
  HandleInsertedText(text, chat_id,username);
}

function PostRowToSheet(rowData, sheetName) {
  let sheet = SpreadsheetApp.openById(SheetId).getSheetByName(sheetName);
  sheet.appendRow(rowData);
}

function SaveData(type, value){
  let sheet = SpreadsheetApp.openById(SheetId).getSheetByName("Tech");
  let adress = DataAdress[type];
  sheet.getRange(adress[0], adress[1]).setValue(value);
  Logger.log("Save " + adress + " ... " + value);
}

function GetSavedData(type) {
  let sheet = SpreadsheetApp.openById(SheetId).getSheetByName("Tech");
  let adress = DataAdress[type][1] - 1;
  let values = sheet.getDataRange().getValues();
  Logger.log("Get: " + "1," + adress + " ... " + type + " ... " + values[0][adress]);
  return values[0][adress];
}

function HandleInsertedText(text, chat_id, username){
  let currentState = GetSavedData(DataType.State); 
  switch (currentState){
    case State.Idle:
      if(text == "AddGuests"){
        SaveData(DataType.State, State.CountInsertion);
        SendResponse(chat_id, "Сколько гостей пришло?", CountKeyboard);
      }
    break;
    case State.CountInsertion:
      if(!Number.isNaN(text) && Number.parseInt(text) > 0){
        SaveData(DataType.Count, text);
        SaveData(DataType.State, State.SourceInsertion);
        SendResponse(chat_id, "Откуда узнали о выставке?", SourceKeyboard);
      }else{
        SendResponse(chat_id, "Нужно ввести или выбрать число\n(Которое больше нуля)", CountKeyboard);
      }
    break;
    case State.SourceInsertion:
      SaveData(DataType.Source, text);
      if(text == GuestSource.Blogger || text == GuestSource.Telegram) {
        SaveData(DataType.State, State.AdditionalInfoInsertion);
        SendResponse(chat_id, "Какой?✍️", AdditionalInfoKeyboard);
      }else {

      let responseText = "Вы ввели:\nКоличество гостей: " + GetSavedData(DataType.Count) + "\nОткуда узнали: " + GuestSourceLocalized[GetSavedData(DataType.  Source)] + " " + GetSavedData(DataType.Info) + "\nВсё верно?";
        SendResponse(chat_id,responseText, ConfirmationKeyboard);
        SaveData(DataType.State, State.Confirmation);
      }
    break;
    case State.AdditionalInfoInsertion:
      if(text == "DontKnow") {
        SaveData(DataType.Info, "(Не помнят какой)")
      }else{
        SaveData(DataType.Info, text);
      }
      let responseText = "Вы ввели:\nКоличество гостей: " + GetSavedData(DataType.Count) + "\nОткуда узнали: " + GuestSourceLocalized[GetSavedData(DataType.Source)] + " " + GetSavedData(DataType.Info) + "\nВсё верно?";
      SendResponse(chat_id,responseText, ConfirmationKeyboard);
      SaveData(DataType.State, State.Confirmation);
    break;
    case State.Confirmation:
      if (text == "Confirm"){
        PostRowToSheet([username, GetActualTime(), GetSavedData(DataType.Count),GuestSourceLocalized[GetSavedData(DataType.Source)] + " " + GetSavedData(DataType.Info)], GetActualSheetName());
        SendResponse(chat_id, "Гости отмечены!", AddNewGuestKeyboard);
      }else {
         SendResponse(chat_id, "Ввод отменён", AddGuestKeyboard);
      }
      ClearTechSheet();
    break;
  }
}

function ClearTechSheet() {
  let sheet = SpreadsheetApp.openById(SheetId).getSheetByName("Tech");
  sheet.clear();
  SaveData(DataType.State,State.Idle);
  SaveData(DataType.Info, " ");
}

function GetMe() {
  let response = UrlFetchApp.fetch("https://api.telegram.org/bot"+BotToken+"/GetMe");
  console.log(response.getContentText());
}

function SetWebHook() {
  let webAppUrl = "https://script.google.com/macros/s/AKfycbywzYlPopoFKRJaLwpoHAI8vcyrkt8yT9bFaSCba35h44jgKQ0jz5pqX-zV7forDHFK/exec";
  let response = UrlFetchApp.fetch("https://api.telegram.org/bot"+BotToken+"/setWebhook?url=" + webAppUrl);
  console.log(response.getContentText());
}

function SendResponse(chat_id, text, keyBoard){
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyBoard)
    }
  };
  UrlFetchApp.fetch("https://api.telegram.org/bot" + BotToken + '/', data);
}

function GetActualTime() {
  let d = new Date();
  let date = pad(d.getDate());
  let month = pad(d.getMonth() + 1);
  let hours = pad(d.getHours());
  let minutes = pad(d.getMinutes());

  let fomated = date + "." + month + " " + hours + ":" + minutes;
  return fomated;
}

function GetActualSheetName() {
  let month = new Date().getMonth() + 1;
  let sheetName = MonthNames[month];
  return sheetName;
}

function pad(n) {
  return (n < 10 ? '0' : '') + n;
}
