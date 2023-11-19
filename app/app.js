import { addRecipe, changePage } from "../model/model.js";

var initialDescCount = 3;

var initialInstrCount = 3;

$(".hamburger-icon").on("click", () =>{
$(".hamburger-icon").toggleClass("open");
});



function changeRoute() {
  let hashTag = window.location.hash;
   let pageID = hashTag.replace('#', '');
   changePage(hashTag, pageID);
  //   console.log(hashTag + ' ' + pageID);
  
  if (pageID != '') {
  $.get(`pages/pageID/pageID.html`, function (data) {
   console.log('data ' + data);
   $('#app').html(data);
  });
  } else {
  $.get(`pages/home/home.html`, function (data) {
  console.log('data ' + data);
   $('#app').html(data);
  });
  }
  }

  function initURLListener() {
  $(window).on('hashchange', changeRoute);
  changeRoute();
  }

  export function addFormListener() {
  $(".descAddBtn").on("click", (e) => {
    initialDescCount++;

    $(".formDesc").append(
      `<input type="text" placeholder="Description ${initialDescCount}" id="desc${
        initialDescCount - 1
      }" />`
    );
  });

  $(".instrAddBtn").on("click", (e) => {
    initialInstrCount++;

    $(".formInstr").append(
      `<input type="text" placeholder="Instruction ${initialInstrCount}" id="desc${
        initialInstrCount - 1
      }" />`
    );
  });

  $(".submit").on("click", (e) => {
    let newItemObj = {};
    let imagePath = $("#imagePath").val();
    let itemName = $("#itemName").val();

    newItemObj.imagePath = imagePath;
    newItemObj.itemName = itemName;
    newItemObj.descriptions = [];
    console.log("newItemObj ", newItemObj);

    $(".formDesc input").each(function (index, data) {
      var value = $(this).val();

      if (value != "") {
        let keyName = "description" + index;
        let descObj = {};
        descObj[keyName] = value;
        newItemObj.descriptions.push(descObj);
      }
    });

    newItemObj.instructions = [];

    $(".formInstr input").each(function (index, data) {
      var value = $(this).val();

      if (value != "") {
        let keyName = "instruction" + index;
        let instrucObj = {};
        instrucObj[keyName] = value;
        newItemObj.instructions.push(instrucObj);
      }
    });

    addRecipe(newItemObj);
  });
}
  
  $(document).ready(function () {
  initURLListener();
  });
