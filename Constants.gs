const TechSheetId = "1CID8CmKOpVs3UYRVYtWgHsTqQeB59gTtb3KJspcQXkQ";
const GuestSheetId = "11_Hwq9wTtbcjHW85tuGUULm0a3a9NoFBC5IfsV0TvMo";
const WorkTimeSheetId = "1lwmErYonIMPxB8JI6QQoibP_WilNDzJtduSgZcPXkT8";
const MainSheetId = "1s_rigrCFNgCA2PGDr2mZUA5AzSRSHhyW6QXjORs0RxQ";

const BotToken = "7426940346:AAFlm0c-H3GYbBO7PP0QZkUmBDop5Dfl-lw";

const CommandType = {
  Unknown : "Unknown",
  BaseMenu : "BaseMenu",
  AddGuests : "AddGuests",
  PostArrivalRecord : "PostArrivalRecord",
  PostLeaveRecord : "PostLeaveRecord",
}

const WorkerRow = {
  "" : 6
}

const BaseMenuCommand = {
  start : "start",
  help : "help",
  changeRole : "changeRole",
}

const MonthNamesLocalized = {
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

const GuestSourceRowIndex = {
  "Yandex" : 3,
  "Beriozka" : 4,
  "StreetAds" : 5,
  "Friends" : 6,
  "Moscow" : 7,
  "Blogger" : 8,
  "Telegram" : 9,
  "Vk" : 10,
  "Inst" : 11,
  "YouTube" : 12,
  "DontKnow" : 13,
  "Internet" : 14,
  "FromStreet" : 15,
  "KudaGo" : 16,
  "MariSubscribed" : 17,
  "Site" : 18
}

const JobTitle = {
  admin : "admin",
  moderator : "moderator",
  manager : "manager"
}

const JobTitleKeyboard = {
  "inline_keyboard" : [
    [{"text" : "Админ", "callback_data" : "/admin"}],
    [{"text" : "Модератор", "callback_data" : "/moderator"}],
  ]
}