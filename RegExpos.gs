const timeReg = /\d\d:\d\d/;
const dateReg = /\d\d[.]\d\d/
const eveningShiftReg = /вечер/i;

const CommandTypeRegs = {
  "BaseMenu" : /\//,
  "AddGuests" : /^\d+/,
  "PostArrivalRecord" : /пришла/i,
  "PostLeaveRecord" : /ушла/i,
  "AddShiftRequest" : /взять/i,
  "RemoveShiftRequest" : /убрать/i,
  "BlockShift" : /не смогу/i,
}

const GuestSourceRegs = {
  Yandex : /яндекс|афиша/i,
  Friends : /друз[(ья)(ей)]|знакомы[ех]|сарафан/i,
  Beriozka : /beriozka|бер[её]зка/i,
  StreetAds : /((уличная)|(на улице))/i,
  Moscow : /москв[ае]/i,
  Blogger : /бло(г)+ер|реклама у бло(г)+ера/i,
  Telegram : /тг|tg|telegram|телеграм|телега/i,
  Vk : /vk|вк|вконтакте/i,
  Inst : /inst|инст/i,
  YouTube : /youtube|ютуб/i,
  DontKnow : /(помн[яи]т|зна[ею]т)/i,
  Internet : /интернет|internet|инет/i,
  FromStreet : /улица|с улицы/i,
  KudaGo : /kuda|куда/i,
  MariSubscribed : /мари[яию]|подпис[(чики)|(аны)]/i,
  Site : /сайт/i,
  Gis : /2gis|gis|гис|2гис/i,
  YandexMail : /yandex mail|mail|яндекс почта|ян почта/i,
  Cassir : /кассир|касса/i,
};