const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// 🎆 Lớp pháo hoa
class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.colors = [
      "#ffeb3b", // vàng
      "#ffc107", // vàng cam
      "#ffffff", // trắng
      "#ff5252"  // đỏ
    ];

    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
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
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }
}

let fireworks = [];

// 🎨 VẼ NỀN ĐỎ TẾT TRÊN CANVAS
function drawRedBackground() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#b71c1c");
  gradient.addColorStop(0.5, "#d32f2f");
  gradient.addColorStop(1, "#f44336");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  // 🔴 LUÔN vẽ nền đỏ trước
  drawRedBackground();

  // 🎆 vẽ pháo hoa lên trên
  fireworks.forEach((fw, index) => {
    fw.update();
    fw.draw();
    if (fw.particles.every(p => p.alpha <= 0)) {
      fireworks.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

// Tạo pháo hoa
setInterval(() => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;
  fireworks.push(new Firework(x, y));
}, 900);

animate();
