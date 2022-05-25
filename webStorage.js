//TABLE

//must have outside
let exercises_count = parseInt(localStorage.getItem("exercises_count"));
// exercises_count=0;
// console.log(exercises_count);

//must have outside
let weeks_count = parseInt(localStorage.getItem("weeks_count"));
// weeks_count=0;
//console.log(weeks_count);

function Table_Auto_Display() {
  //zaladowanie cwiczen do datalist
  Datalist_Load();
  //reset tabeli
  let table = document.getElementById("table");
  table.removeChild(document.getElementById("thead"));
  table.removeChild(document.getElementById("tbody"));
  let thead = document.createElement("thead");
  thead.setAttribute("id", "thead");
  let row0 = document.createElement("tr");
  row0.setAttribute("id", "row0");
  let t1 = document.createElement("th");
  let t2 = document.createElement("th");
  let t3 = document.createElement("th");
  let t4 = document.createElement("th");
  let button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", "delete_all");
  button.setAttribute("onclick", "Table_Delete_All()");
  button.innerHTML = "Delete All";
  t1.innerHTML = "Exercise";
  t1.appendChild(button);
  t2.innerHTML = "Tempo";
  t3.innerHTML = "Sets X Reps";
  t4.innerHTML = "Weight";
  row0.appendChild(t1);
  row0.appendChild(t2);
  row0.appendChild(t3);
  row0.appendChild(t4);
  thead.appendChild(row0);
  table.appendChild(thead);
  let tbody = document.createElement("tbody");
  tbody.setAttribute("id", "tbody");
  table.appendChild(tbody);

  //weeks_count - headrow and collumns
  for (let k = 0; k < weeks_count; k++) {
    //creating new headrow element
    let column = document.createElement("th");
    //text of element
    column.appendChild(document.createTextNode("Week " + (k + 1)));
    //button to delete column
    let button = document.createElement("button");
    button.setAttribute("class", "delete_tab");
    button.setAttribute("type", "button");
    button.setAttribute("onclick", "Table_Delete_Column(" + (k + 4) + ")");
    button.innerHTML = "X";
    column.appendChild(button);
    //adding element to headrow
    document.getElementById("row0").appendChild(column);
  }

  //exercises_storage - rows
  for (let i = 1; i <= exercises_count; i++) {
    // creates new row with draggable
    let row = document.createElement("tr");
    row.setAttribute("draggable", "true");
    row.setAttribute("id", i);
    //new text for elements in row - easier access to change
    //load exercise from local storage
    let exercise = JSON.parse(localStorage["exercises_storage_" + i]);
    //dziala
    //console.log(exercise);

    //creating row cells
    for (let j = 0; j < weeks_count + 4; j++) {
      // create new empty cell
      let cell = document.createElement("td");
      //new button-delete row
      let button = document.createElement("button");
      button.setAttribute("class", "delete_tab");
      button.setAttribute("type", "button");
      button.setAttribute("onclick", "Table_Delete_Row(" + i + ")");
      button.innerHTML = "X";
      switch (j) {
        case 0:
          //first column exercise + button to delete row
          cell.innerHTML = exercise[j] + " ";
          cell.appendChild(button);
          cell.setAttribute("id", "w" + j + "e" + i);
          //cannot be editable
          cell.setAttribute(
            "oninput",
            "Table_Save_Change(w" + j + "e" + i + ")"
          );
          break;
        default:
          //add saved edited values
          if (exercise[j]) cell.innerHTML = exercise[j];
          cell.setAttribute("id", "w" + j + "e" + i);
          //editable content
          cell.setAttribute("contenteditable", "true");
          cell.setAttribute(
            "oninput",
            "Table_Save_Change(w" + j + "e" + i + ")"
          );
      }

      row.appendChild(cell);
    }
    row.setAttribute("ondragstart", "Drag(event)");
    row.setAttribute("ondragover", "Allow_Drop(event)");
    row.setAttribute("ondrop", "Drop(event)");
    //adding created row to table
    tbody.appendChild(row);
  }
} //working

function Table_Save_Change(cell) {
  //dziala
  // console.log(cell.innerHTML);
  //console.log(isNaN(index[0])); //check if is number( nan false= liczba)
  let index = cell.id;
  let j = 1;
  let week = "",
    exercise = ""; //empty constants
  for (let i = 0; i < 3; i++) {
    while (!isNaN(index[j])) {
      if (i < 1) {
        week += index[j]; //get week number
      } else {
        exercise += index[j]; //get exercise number
      }
      j++;
    }
    j++;
  }
  //working
  // console.log(j);
  // console.log(week);
  // console.log(exercise);
  //get exercise array
  let exercises_storage = JSON.parse(
    localStorage["exercises_storage_" + exercise]
  );
  exercises_storage[week] = cell.innerHTML;
  //save changed value
  localStorage["exercises_storage_" + exercise] =
    JSON.stringify(exercises_storage);
} //working on input

function Table_Add_Column() {
  //take weeks_count value from form
  let weeks = parseInt(document.getElementById("weeks").value);
  //autofill
  if (!weeks) weeks = 1;
  weeks_count += weeks;
  //dziala
  // console.log(weeks_count);
  localStorage.setItem("weeks_count", weeks_count); //zapisanie wartosci w pamieci - set to zero and refresh page after adding week
  event.preventDefault();
  Table_Auto_Display();
} //working

function Table_Add_Exercise() {
  //get values from form  autofill if empty
  let exercise = document.getElementById("exercise").value;

  if (!exercise) {
    exercise = "Exercise";
  }
  let tempo = document.getElementById("tempo").value;
  if (!tempo) {
    tempo = "2010";
  }
  let setsXreps = document.getElementById("setsXreps").value;
  if (!setsXreps) {
    setsXreps = "3x10";
  }
  let weight = document.getElementById("weight").value;
  if (!weight) {
    weight = "100kg";
  }
  let New_exercise = [exercise, tempo, setsXreps, weight];
  // dziala
  //console.log(New_exercise);

  //save to local storage new exercise
  exercises_count++;
  localStorage["exercises_storage_" + exercises_count] =
    JSON.stringify(New_exercise);
  //dziala
  //console.log(localStorage["exercises_storage_" + exercises_count]);

  //must have been set at zero one time to work, sets initial point
  localStorage.setItem("exercises_count", exercises_count);
  //dziala
  //console.log(localStorage.getItem("exercises_count"));

  event.preventDefault();
  Table_Auto_Display();
} //working

function Table_Delete_Column(id) {
  //console.log(id);
  weeks_count--;
  localStorage.setItem("weeks_count", weeks_count);
  Table_Auto_Display();
  for (let i = 1; i <= exercises_count; i++) {
    let exercise = JSON.parse(localStorage["exercises_storage_" + i]);
    //dziala
    // console.log(exercise);

    exercise.splice(id, 1);
    //dziala
    // console.log(exercise);

    //save in local storage fixed array
    localStorage["exercises_storage_" + i] = JSON.stringify(exercise);
  }
  Table_Auto_Display();
} //working

function Table_Delete_Row(id) {
  //swap all rows in local storage
  for (let i = id; i < exercises_count; i++) {
    //console.log("before" + JSON.parse(localStorage["exercises_storage_" + i]));
    localStorage["exercises_storage_" + i] = JSON.stringify(
      JSON.parse(localStorage["exercises_storage_" + (i + 1)])
    );
    // console.log("after" + JSON.parse(localStorage["exercises_storage_" + i]));
  }
  exercises_count--;
  localStorage.setItem("exercises_count", exercises_count);
  Table_Auto_Display();
} //working

function Table_Delete_All() {
  for (let i = exercises_count; i >= 1; i--) {
    Table_Delete_Row(i);
  }
  for (let j = weeks_count + 3; j >= 4; j--) {
    Table_Delete_Column(j);
  }
} //working

function Drag(event) {
  //get element's id
  event.dataTransfer.setData("text", event.target.id);
} //working

function Allow_Drop(event) {
  //shows that its allowed to drop
  event.preventDefault();
} //working

function Drop(event) {
  event.preventDefault();
  //get target row
  let target_row = event.target.parentElement,
    target_row_id = target_row.id;
  //console.log(target_row_id);
  let target_exercise = JSON.parse(
    localStorage["exercises_storage_" + target_row_id]
  );

  //get  dragged row
  let drag_row = document.getElementById(event.dataTransfer.getData("text")),
    drag_row_id = drag_row.id;
  //console.log(drag_row_id);
  let drag_exercise = JSON.parse(
    localStorage["exercises_storage_" + drag_row_id]
  );
  //save swapped rows in local storage
  localStorage["exercises_storage_" + target_row_id] =
    JSON.stringify(drag_exercise);
  localStorage["exercises_storage_" + drag_row_id] =
    JSON.stringify(target_exercise);
  Table_Auto_Display();
} //working

//DATALIST

//must be generated one time - reseter
// data_count = 0;
// let datalist_storage = [];
// localStorage["datalist_storage"] = JSON.stringify(datalist_storage);

//must have outside
let data_count = parseInt(localStorage.getItem("data_count"));
//console.log(data_count);

function Datalist_Load() {
  //load all elements from local storage to datalist
  let datalist = document.getElementById("exercises");
  let datalist_storage = JSON.parse(localStorage["datalist_storage"]);
  for (let i = 0; i < data_count; i++) {
    if (datalist_storage[i]) {
      //elements in datalist from local storage
      let option = document.createElement("option");
      option.setAttribute("value", datalist_storage[i]);
      datalist.appendChild(option);
    }
  }
}
function Datalist_Add_New() {
  let New_exercise = document.getElementById("New_exercise").value;
  //check if empty
  if (New_exercise) {
    data_count++;
    localStorage.setItem("data_count", data_count);
    //add new option to datalist
    let datalist_storage = JSON.parse(localStorage["datalist_storage"]);
    datalist_storage.push(New_exercise);
    localStorage["datalist_storage"] = JSON.stringify(datalist_storage);
  }
  event.preventDefault();
  Datalist_Load();
}
