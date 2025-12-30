const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// 🎆 Pháo hoa
class Firework {
  constructor(x, y) {
    this.particles = [];
    this.colors = ["#ffeb3b", "#ffc107", "#ffffff", "#ff5252"];

    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x,
        y,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 5 + 2,
        alpha: 1,
        color: this.colors[Math.floor(Math.random() * this.colors.length)]
      });
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.02;
    });
  }

  draw() {
    this.particles.forEach(p => {
      if (p.alpha <= 0) return;
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

let fireworks = [];

function drawBackground() {
  const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  g.addColorStop(0, "#b71c1c");
  g.addColorStop(0.5, "#d32f2f");
  g.addColorStop(1, "#f44336");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  drawBackground();

  fireworks.forEach((fw, i) => {
    fw.update();
    fw.draw();
    if (fw.particles.every(p => p.alpha <= 0)) {
      fireworks.splice(i, 1);
    }
  });

  requestAnimationFrame(animate);
}

setInterval(() => {
  fireworks.push(
    new Firework(
      Math.random() * canvas.width,
      Math.random() * canvas.height * 0.5
    )
  );
}, 900);

animate();
