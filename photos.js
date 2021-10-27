window.onload = choose_random;



function choose_random() {
  console.log("mypics[randomNum]");

  var mypics = new Array();
  for (i = 0; i < 1000;i+=1){
      mypics[i] = "http//www.github.com/JakobSchauser/JakobSchauser.github.io/blob/master/frames/frame"+String(i)+".jpg?raw=true";
  }

  var randomNum = Math.floor(Math.random() * mypics.length);
  console.log(mypics[randomNum]);
  document.getElementById("mainImg").src = mypics[randomNum];
}