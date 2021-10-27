window.onload = choose_random;

var mypics = new Array()
// for (i = 0; i < 1898;i+=1){
//     mypics[i] = "frames/frame"+String(i*10)+".jpg"
// }


function choose_random() {
  var randomNum = Math.floor(Math.random() * mypics.length);
  document.getElementById("mainImg").src = mypics[randomNum];
}