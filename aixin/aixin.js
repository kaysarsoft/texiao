//爱心飘落动画效果
//创建日期：26.02.20.1

			// 全局变量定义
			var stop; // 用于存储动画帧ID，用于停止动画
			var staticx; // 标记动画是否正在运行
			var img = new Image(); // 创建图片对象
			// 设置爱心图片地址
			img.src = "./aixin.png";
			
			/**
			 * 爱心类
			 * @param {number} x - 爱心初始X坐标
			 * @param {number} y - 爱心初始Y坐标
			 * @param {number} s - 爱心大小缩放比例
			 * @param {number} r - 爱心初始旋转角度
			 * @param {object} fn - 包含更新函数的对象
			 */
			function Sakura(x, y, s, r, fn) {
				this.x = x; // X坐标
				this.y = y; // Y坐标
				this.s = s; // 大小缩放比例
				this.r = r; // 旋转角度
				this.fn = fn; // 更新函数对象
			}

			/**
			 * 绘制爱心
			 * @param {CanvasRenderingContext2D} cxt - 画布上下文
			 */
			Sakura.prototype.draw = function(cxt) {
				cxt.save(); // 保存当前画布状态
				var xc = 40 * this.s / 4; // 计算缩放后的爱心中心坐标
				cxt.translate(this.x, this.y); // 平移到爱心位置
				cxt.rotate(this.r); // 应用旋转
				// 绘制爱心图片
				cxt.drawImage(img, 0, 0, 40 * this.s, 40 * this.s)
				cxt.restore(); // 恢复画布状态
			}

			/**
			 * 更新爱心位置和状态
			 */
			Sakura.prototype.update = function() {
				// 更新X坐标
				this.x = this.fn.x(this.x, this.y);
				// 更新Y坐标
				this.y = this.fn.y(this.y, this.y);
				// 更新旋转角度
				this.r = this.fn.r(this.r);
				// 检查爱心是否超出屏幕范围
				if(this.x > window.innerWidth ||
					this.x < 0 ||
					this.y > window.innerHeight ||
					this.y < 0
				) {
					// 重置旋转角度
					this.r = getRandom('fnr');
					// 随机从顶部或右侧重新生成爱心
					if(Math.random() > 0.4) {
						// 从顶部生成
						this.x = getRandom('x');
						this.y = 0;
						this.s = getRandom('s');
						this.r = getRandom('r');
					} else {
						// 从右侧生成
						this.x = window.innerWidth;
						this.y = getRandom('y');
						this.s = getRandom('s');
						this.r = getRandom('r');
					}
				}
			}

			/**
			 * 爱心列表类，用于管理多个爱心对象
			 */
			SakuraList = function() {
				this.list = []; // 存储爱心对象的数组
			}
			
			/**
			 * 添加爱心到列表
			 * @param {Sakura} sakura - 爱心对象
			 */
			SakuraList.prototype.push = function(sakura) {
				this.list.push(sakura);
			}
			
			/**
			 * 更新所有爱心的状态
			 */
			SakuraList.prototype.update = function() {
				for(var i = 0, len = this.list.length; i < len; i++) {
					this.list[i].update();
				}
			}
			
			/**
			 * 绘制所有爱心
			 * @param {CanvasRenderingContext2D} cxt - 画布上下文
			 */
			SakuraList.prototype.draw = function(cxt) {
				for(var i = 0, len = this.list.length; i < len; i++) {
					this.list[i].draw(cxt);
				}
			}
			
			/**
			 * 获取指定索引的爱心
			 * @param {number} i - 索引
			 * @returns {Sakura} 爱心对象
			 */
			SakuraList.prototype.get = function(i) {
				return this.list[i];
			}
			
			/**
			 * 获取爱心列表长度
			 * @returns {number} 爱心数量
			 */
			SakuraList.prototype.size = function() {
				return this.list.length;
			}

			/**
			 * 生成随机参数
			 * @param {string} option - 参数类型
			 * @returns {number|function} 随机值或函数
			 */
			function getRandom(option) {
				var ret, random;
				switch(option) {
					case 'x': // 随机X坐标
						ret = Math.random() * window.innerWidth;
						break;
					case 'y': // 随机Y坐标
						ret = Math.random() * window.innerHeight;
						break;
					case 's': // 随机大小缩放比例
						ret = Math.random();
						break;
					case 'r': // 随机旋转角度
						ret = Math.random() * 6;
						break;
					case 'fnx': // 随机X方向移动函数
						random = -0.5 + Math.random() * 1;
						ret = function(x, y) {
							return x + 0.5 * random - 1.7;
						};
						break;
					case 'fny': // 随机Y方向移动函数
						random = 1.5 + Math.random() * 0.7
						ret = function(x, y) {
							return y + random;
						};
						break;
					case 'fnr': // 随机旋转速度函数
						random = Math.random() * 0.03;
						ret = function(r) {
							return r + random;
						};
						break;
				}
				return ret;
			}

			/**
			 * 开始爱心飘落动画
			 */
			function startSakura() {
				// 兼容性处理，获取requestAnimationFrame函数
				requestAnimationFrame = window.requestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					window.oRequestAnimationFrame;
				
				// 创建画布元素
				var canvas = document.createElement('canvas'),
					cxt;
				staticx = true; // 标记动画正在运行
				
				// 设置画布大小为窗口大小
				canvas.height = window.innerHeight;
				canvas.width = window.innerWidth;
				// 设置画布样式，固定定位在顶部
				canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;');
				canvas.setAttribute('id', 'canvas_sakura');
				// 将画布添加到页面
				document.getElementsByTagName('body')[0].appendChild(canvas);
				// 获取画布上下文
				cxt = canvas.getContext('2d');
				
				// 创建爱心列表
				var sakuraList = new SakuraList();
				// 生成50个爱心对象
				for(var i = 0; i < 50; i++) {
					var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny;
					randomX = getRandom('x'); // 随机X坐标
					randomY = getRandom('y'); // 随机Y坐标
					randomR = getRandom('r'); // 随机旋转角度
					randomS = getRandom('s'); // 随机大小缩放比例
					randomFnx = getRandom('fnx'); // 随机X方向移动函数
					randomFny = getRandom('fny'); // 随机Y方向移动函数
					randomFnR = getRandom('fnr'); // 随机旋转速度函数
					
					// 创建爱心对象
					sakura = new Sakura(randomX, randomY, randomS, randomR, {
						x: randomFnx,
						y: randomFny,
						r: randomFnR
					});
					// 绘制爱心
					sakura.draw(cxt);
					// 添加到爱心列表
					sakuraList.push(sakura);
				}
				
				// 开始动画循环
				stop = requestAnimationFrame(function() {
					// 清空画布
					cxt.clearRect(0, 0, canvas.width, canvas.height);
					// 更新所有爱心状态
					sakuraList.update();
					// 绘制所有爱心
					sakuraList.draw(cxt);
					// 继续下一帧动画
					stop = requestAnimationFrame(arguments.callee);
				})
			}

			/**
			 * 窗口大小改变事件处理
			 */
			window.onresize = function() {
				// 注意：这里的ID应该是'canvas_sakura'，而不是'canvas_snow'
				// 修正为正确的ID
				var canvasSnow = document.getElementById('canvas_sakura');
				if(canvasSnow) {
					canvasSnow.width = window.innerWidth;
					canvasSnow.height = window.innerHeight;
				}
			}

			/**
			 * 图片加载完成事件处理
			 */
			img.onload = function() {
				// 图片加载完成后开始动画
				startSakura();
			}

			/**
			 * 停止或重新开始动画
			 */
			function stopp() {
				if(staticx) {
					// 如果动画正在运行，停止动画
					var child = document.getElementById("canvas_sakura");
					if(child) {
						child.parentNode.removeChild(child);
						// 取消动画帧
						window.cancelAnimationFrame(stop);
						staticx = false; // 标记动画已停止
					}
				} else {
					// 如果动画已停止，重新开始
					startSakura();
				}
			}
		
		
