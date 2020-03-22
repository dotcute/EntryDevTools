const list = Entry.variableContainer.getListByName('%0');
let listArray = list.getArray();
listArray['%1' - 1] = '%2';
list.setArray(listArray);
