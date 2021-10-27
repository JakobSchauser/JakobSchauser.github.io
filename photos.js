window.onload = choose_random;

var mypics = new Array()
for (i = 0; i < 26670;i+=10){
    mypics[i] = "frames/frame"+String(i)+".jpg"
}

function choose_random() {
  var randomNum = Math.floor(Math.random() * mypics.length);
  document.getElementById("mainImg").src = mypics[randomNum];
}