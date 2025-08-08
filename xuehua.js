 // 创建一个立即执行函数
(function() {
// 定义变量
var flakes = [], // 雪花数组
canvas = document.createElement("canvas"), // 创建画布
ctx = canvas.getContext("2d"), // 获取画布上下文
flakeCount = 200, // 雪花数量
mX = -100, // 鼠标X坐标
mY = -100; // 鼠标Y坐标

// 设置画布属性
canvas.setAttribute("id", "snowfall");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "999999";
canvas.style.pointerEvents = "none";

// 将画布添加到body中
document.body.appendChild(canvas);

// 设置画布宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 雪花动画函数
function snow() {
// 清空画布
ctx.clearRect(0, 0, canvas.width, canvas.height);

// 循环遍历雪花数组
for (var i = 0; i < flakeCount; i++) {
  var flake = flakes[i], // 获取当前雪花
    x = mX, // 雪花X坐标
    y = mY, // 雪花Y坐标
    minDist = 50, // 最小距离
    x2 = flake.x, // 当前雪花X坐标
    y2 = flake.y; // 当前雪花Y坐标

  // 计算距离和方向
  var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
    dx = x2 - x,
    dy = y2 - y;

  // 如果距离小于最小距离
  if (dist < minDist) {
    var force = minDist*2 / (dist * dist), // 计算力度
      xcomp = (x - x2) / dist,
      ycomp = (y - y2) / dist,
      deltaV = force / 2;

    // 更新雪花速度
    flake.velX -= deltaV * xcomp;
    flake.velY -= deltaV * ycomp;

  } else {
    // 如果距离大于等于最小距离
    flake.velX *= .28;
    if (flake.velY <= flake.speed) {
      flake.velY = flake.speed
    }
    flake.velX += Math.cos(flake.step += .25) * flake.stepSize;
  }

  // 绘制雪花
  ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
  flake.y += flake.velY;
  flake.x += flake.velX;

  // 如果雪花超出画布范围，重置雪花
  if (flake.y >= canvas.height || flake.y <= 0) {
    reset(flake);
  }

  if (flake.x >= canvas.width || flake.x <= 0) {
    reset(flake);
  }

  ctx.beginPath();
  ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
  ctx.fill();
}
// 循环调用动画函数
requestAnimationFrame(snow);
};

// 重置雪花函数
function reset(flake) {
flake.x = Math.floor(Math.random() * canvas.width);
flake.y = 0;
flake.size = (Math.random() * 3) + 2;
flake.speed = (Math.random() * 1) + 0.5;
flake.velY = flake.speed;
flake.velX = 0;
flake.opacity = (Math.random() * 0.5) + 0.3;
}

// 初始化函数
function init() {
// 循环创建雪花
for (var i = 0; i < flakeCount; i++) {
var x = Math.floor(Math.random() * canvas.width),
y = Math.floor(Math.random() * canvas.height),
size = (Math.random() * 3) + 2,
speed = (Math.random() * 1) + 0.5,
opacity = (Math.random() * 0.5) + 0.3;

  // 将雪花添加到数组中
  flakes.push({
    speed: speed,
    velY: speed,
    velX: 0,
    x: x,
    y: y,
    size: size,
    stepSize: (Math.random()) / 30,
    step: 0,
    opacity: opacity
  });
}

// 调用雪花动画函数
snow();
};

// 监听鼠标移动事件，更新鼠标坐标
document.addEventListener("mousemove", function(e) {
mX = e.clientX,
mY = e.clientY
});

// 监听窗口大小改变事件，更新画布宽高
window.addEventListener("resize", function() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});

// 初始化
init();
})();