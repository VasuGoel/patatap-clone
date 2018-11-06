// Confetti Animation

let canvas = document.getElementById('myCanvas');

canvas.width = 1280;
canvas.height = 800;

let ctx = canvas.getContext('2d');
let pieces = [];
let numberOfPieces = 75;
let lastUpdateTime = Date.now();

function randomColor () {
  let colors = ['#f00', '#0f0', '#00f', '#0ff', '#f0f', '#ff0'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function update () {
  let now = Date.now(),
      dt = now - lastUpdateTime;

  for (let i = pieces.length - 1; i >= 0; i--) {
      let p = pieces[i];

      if (p.y > canvas.height) {
          pieces.splice(i, 1);
          continue;
      }

      p.y += p.gravity * dt;
      p.rotation += p.rotationSpeed * dt;
  }


  while (pieces.length < numberOfPieces) {
      pieces.push(new Piece(Math.random() * canvas.width, -20));
  }

  lastUpdateTime = now;

  setTimeout(update, 1);
}

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(function (p) {
      ctx.save();

      ctx.fillStyle = p.color;

      ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
      ctx.rotate(p.rotation);

      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

      ctx.restore();
  });

  requestAnimationFrame(draw);
}

function Piece (x, y) {
  this.x = x;
  this.y = y;
  this.size = (Math.random() * 0.5 + 0.75) * 15;
  this.gravity = (Math.random() * 0.5 + 0.75) * 0.1;
  this.rotation = (Math.PI * 2) * Math.random();
  this.rotationSpeed = (Math.PI * 2) * (Math.random() - 0.5) * 0.001;
  this.color = randomColor();
}

while (pieces.length < numberOfPieces) {
  pieces.push(new Piece(Math.random() * canvas.width, Math.random() * canvas.height));
}

update();
draw();


// Animate and remove h1 when a to z key is pressed and add fadeIn animation on canvas
$("html").on("keydown", function(event) {
  if(event.which >= 65 && event.which <= 90) {
    $("h1").css("display", "none");
    $(canvas).addClass("animated fadeIn");
  } else {
    $("h1").css("display", "unset");
    $("h1").toggleClass("animated shake");
  }
});

// Animate h1 when hovered over
$("h1").on("mouseenter", function() {
  $(this).addClass("animated bounceIn")
})

// Remove animated class when the animation is done
$("h1").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
     $(this).removeClass("animated shake");
     $(this).removeClass("animated bounceIn");
});
$(canvas).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
  $(this).removeClass("animated fadeIn");
});
