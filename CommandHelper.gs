function ParseCommandType(text){
  if(text.startsWith("/")){
    return CommandType.BaseMenu;
  }else if(text.match(guestEnterReg)){
    return CommandType.AddGuests;
  }else if(text.match(appearenceReg)){
    return CommandType.PostArrivalRecord;
  }else if(text.match(leaveReg)){
    return CommandType.PostLeaveRecord;
  }else {
    return CommandType.Unknown;
  }
}

function HandlePostCommand(data){
  switch (data.commandType){
    case CommandType.BaseMenu:
      HandleMenuCommand(data);
    break;
    case CommandType.AddGuests:
      AddGuests(data);
    break;
    case CommandType.PostArrivalRecord:
    
    break;
    case CommandType.PostLeaveRecord:
    
    break;
    default:
    ResponseHelper.SendUnknownCommandResponse(data.chat_id);
    break;
  }
}

function HandleMenuCommand(data){
  switch(data.text.remove("/").toLowerCase()){
    case BaseMenuCommand.start:
    case BaseMenuCommand.changeRole:
      SendResponse(data.chat_id, "Как вас записать?", JobTitleKeyboard);
    break;
    case BaseMenuCommand.help:
      ResponseHelper.SendHelpInfoResponse(data.chat_id);
    break;
    case JobTitle.admin:
      WorkersHelper.SetJobTitle(data, JobTitle.admin);
    break;
    case JobTitle.moderator:
      WorkersHelper.SetJobTitle(data, JobTitle.moderator);
    break;
    default:
     ResponseHelper.SendUnknownCommandResponse(data.chat_id);
    break;
  }
}