const MorningShiftRangeOffset = 0;
const EveningShiftRangeOffset = 1;
const ArrivalRangeOffset = 2;
const LeaveRangeOffset = 3;
const TotalWorkTimeOffset = 4;

function AddArrivalRec(data){
  let list = SpreadsheetApp.openById(WorkTimeSheetId).getSheetByName("Лист1");
  let date = GetDatePost(data.dateTime, data.text);
  let time = GetTimePost(data.dateTime, data.text);
  PostWorkTime(list, data.username, date, time, ArrivalRangeOffset);
  SendResponse(data.chat_id, `Время прибытия записано:\n${date} в ${time}`);
}

function AddLeaveRec(data){
  let list = SpreadsheetApp.openById(WorkTimeSheetId).getSheetByName("Лист1");
  let date = GetDatePost(data.dateTime, data.text);
  let time = GetTimePost(data.dateTime, data.text);
  PostWorkTime(list, data.username, date, time, LeaveRangeOffset);
  let totalWorkTime = GetTotalWorkTime(list, data.username, date);
  SendResponse(data.chat_id, `Время ухода записано:\n${date} в ${time}\nВремени на работе в этот день: ${totalWorkTime}`);
}

function GetTotalWorkTime(list, username, date){
  let column = GetColumnForWorkerNEWSheet(list, username);
  let range = GetDateRangeForWorkerNEW(list, date);
  let arrivalCell = list.getRange(range.getRow() + TotalWorkTimeOffset, column);
  return arrivalCell.getValue().toTimeString().split(" ")[0].match(timeReg);
}

function PostWorkTime(list, username, date, time, rangeOffset){
  let column = GetColumnForWorkerNEWSheet(list, username);
  let range = GetDateRangeForWorkerNEW(list, date);
  let arrivalCell = list.getRange(range.getRow() + rangeOffset, column);
  arrivalCell.setValue(time);
}

function GetTimePost(dateTime, text){
  let time = text.match(timeReg);
  if(time == null){
    time = dateTime.toTimeString().split(" ")[0].match(timeReg);
  }
  return time;
}

function GetDatePost(dateTime, text){
  let date = text.match(dateReg);
  if(date == null){
    date = (Utilities.formatDate(dateTime, 'Etc/GMT', 'dd.MM'));
  }
  return date;
}

function GetDateRangeForWorkerNEW(list, date){
  let range = list.getRange(1, 1, list.getLastRow(), 1).createTextFinder(date).findNext();
  return range;
}

function GetColumnForWorkerNEWSheet(list, username){
  let column = list.getRange(3, 4, 3, list.getLastColumn()).createTextFinder(username).matchCase(false).findNext().getColumn();
  return column;
}

function GetRowForWorkerOLDSheet(list, username){
  let fullName = WorkerNames[username];
  let nameRow = list.getRange(2, 1, list.getLastRow(), 1).createTextFinder(fullName).matchCase(false).findNext().getRow();
  return nameRow;
}