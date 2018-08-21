window.onload = function(){


}

function(){
el = document.getElementById("first")
el . innerText = "Not First"
}

 var i == 0;

function changeImage(){
  var list = ["worldmap.jpg", "food.jpg", "museum.jpg", "science.jpg"]
    i++;
  if(i > 3){
  i = 0;
  }
  var newImg = list[i];
  document.getElementById("theImage").src = newImg

}
