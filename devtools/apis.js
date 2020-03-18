let func = {};

func.getVariableByName = (name) => {
  let variable = Entry.variableContainer.getVariableByName(name);
  return (variable != undefined) ? variable.getValue() : 0;
}

func.getArrayByName = (name) => {
  let list = Entry.variableContainer.getListByName(name);
  return (list != undefined) ? list.getArray() : [];
}

func.getValueOfIndexFromListByName = (name, index) => {
  let array = func.getArrayByName(name);
  if(0 <= index && index < array.length){
    return array[index].data;
  }else{
    return null;
  }
}

func.setVariableByName = (name, value) => {
  let variable = Entry.variableContainer.getVariableByName(name);
  if(variable != undefined){
    variable.setValue(value);
  }
}

func.changeValueOfIndexToListByName = (name, index, value) => {
  let list = Entry.variableContainer.getListByName(name);
  if(list != undefined){
    let array = list.getArray();
    if(0 <= index && index < array.length){
      list.replaceValue(index, value);
    }
  }
}

func.addValueToListByName = (name, value) => {
  let list = Entry.variableContainer.getListByName(name);
  if(list != undefined){
    list.appendValue(value);
  }
}
