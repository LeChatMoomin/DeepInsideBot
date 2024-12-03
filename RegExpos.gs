const guestEnterReg = /^\d+/;

const appearenceReg = /пришла/i;
const leaveReg = /ушла/i;
const timeReg = /\d\d:\d\d$/;

const baseComandReg = /\\/;

const GuestSourceRegs = {
  Yandex : /^yandex|яндекс/i,
  Friends : /друз[(ья)(ей)]|знакомы[ех]/i,
  Beriozka : /beriozka|бер[её]зка/i,
  StreetAds : /((уличная)|(на улице))/i,
  Moscow : /москв[ае]/i,
  Blogger : /бло(г)+ер|реклама у бло(г)+ера/i,
  Telegram : /тг|tg|telegram|телеграм/i,
  Vk : /vk|вк|вконтакте/i,
  Inst : /inst|инст/i,
  YouTube : /youtube|ютуб/i,
  DontKnow : /(помн[яи]т|зна[ею]т)/i,
  Internet : /интернет|internet|инет/i,
  FromStreet : /улица|с улицы/i,
  KudaGo : /kuda|куда/i,
  MariSubscribed : /мари[ияю]/i,
  Site : /сайт/i
};