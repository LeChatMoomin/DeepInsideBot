function TestComandTypeParser() {
  let type =(new Date()).toTimeString().split(" ")[0];
  Logger.log(type);
}

function TestTypes(){
  let num = 1;
  let char = 'a';
  let someNewType = {num, char};

  Logger.log(`num: ${typeof(num)}, char: ${typeof(char)} some: ${typeof(someNewType)}`);
}

function TestEnums(){
  let data = new PostData(291296492, "Пришла", "AlexJordan42", CommandType.PostArrivalRecord);
  let cell = AddArrivalRec(data);
}

function FillSomeShit(){
  let text = "Пришла";
  let match = text.match(timeReg);
  Logger.log(match);
}