for (i = 0; i < 26670;i+=10){
    nms[i] = "frames/frame"+String(i)
}

var arr = new collection(nms);

function collection(imgs) {
  this.imgs = imgs;
  this.i = 0;
  this.next = function(element) {
    var img = document.getElementById('element')
    this.i++;
    if (this.i == imgs.length) {
      this.i = 0;
    }
    img.src = imgs[this.i].src;
  }
}