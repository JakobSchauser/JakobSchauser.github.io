window.onload = choose_random;

var mypics = new Array()
for (i = 0; i < 1000;i+=1){
    mypics[i] = "frames/frame"+String(i)+".jpg"
}


function choose_random() {
  
  var randomNum = Math.floor(Math.random() * mypics.length);
  console.log(mypics[randomNum]);
  document.getElementById("mainImg").src = mypics[randomNum];
}