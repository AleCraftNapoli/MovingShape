let spacing = 35;
let CSize = 500;
let r = (CSize/2) - spacing;
let path = [];
let sh;
let size = 50;
console.log("To edit the shape, type in the console:", "'sh.ns = <shape>;'", "\nWhere <shape> is 'tr' (Triangle), 'sq' (Square), 're' (Rectangle) or 'ci' (Circle).");

function setup() {
  cnv = createCanvas(CSize, CSize);
  cnv.position(10, 40);
  spacing = document.getElementById('sp').value;
  if (spacing > CSize/2) {
	alert("Spacing too big, resetted to 35"); 
	spacing = 35;
	document.getElementById('sp').value = 35;
  }
  r = (CSize/2) - spacing;
  path = [];
  angleMode(DEGREES);
  for (let a = 0; a < 360; a += 1) {
    path.push(polCar(r, a));
  }
  background(0);
  sh = new Shape(path[0].x, path[0].y, size, path);
}

function draw() {
  
  background(0);
  translate(width/2, height/2);
  rotate(-90);
  //Draw Path
  noFill();
  stroke(52);
  beginShape();
  for (let i = 0; i < path.length; i++) {
    let v = path[i];
    vertex(v.x, v.y);
  }
  endShape(CLOSE);

  //Draw Square
  sh.show();
}

function polCar(r, a) {
  let x = r * cos(a);
  let y = r * sin(a);
  return createVector(x, y);
}

function change(n) {
	if (n == 0) {
      sh.ns = "tr";
    }
    else if (n == 1) {
      sh.ns = "sq";
    }
    else if (n == 2) {
      sh.ns = "re";
    }
    else if (n == 3) {
      sh.ns = "ci";
    }
}

class Shape {
  constructor(cx, cy, s, p) {
    this.x = cx - (s/2);
    this.y = cy - (s/2);
    this.s = s;
    this.ns = "sq";
    this.p = p;
    this.i = 0;
  }

  show() {
    fill(0, 255, 0);
    if (this.ns == "tr") {
      this.showTr();
    }
    else if (this.ns == "sq") {
      this.showSq();
    }
    else if (this.ns == "re") {
      this.showRe();
    }
    else if (this.ns == "ci") {
      this.showCi();
    }
    fill(0);
    ellipse(this.x + (this.s/2), this.y + (this.s/2), 3, 3);


    if (this.i < this.p.length) {
      this.x = this.p[this.i].x - (this.s/2);
      this.y = this.p[this.i].y - (this.s/2);
      this.i++;
    }
    else {
      this.i = 0;
    }
  }

  showTr() {
    beginShape();
    vertex(this.x + this.s + this.s/10, this.y + (this.s/2));
    vertex(this.x + this.s/10, this.y);
    vertex(this.x + this.s/10, this.y + this.s);
    endShape(CLOSE);
  }

  showSq() {
    rect(this.x, this.y, this.s, this.s);
  }

  showRe() {
    rect(this.x, this.y - this.s/2, this.s, 2*this.s);
  }

  showCi() {
    ellipse(this.x + (this.s/2), this.y + (this.s/2), this.s, this.s);
  }
}
