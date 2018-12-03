var initConfig = {
  maxIndex: 0,
  width: 320,
  height: 300,
  r: 80,
  r1: 50,
  categoriesNum: [],
  categoriesName: ['语言', '逻辑', '视觉', '身体', '音乐', '人际交往', '自我认知', '自我观察'],
  canvasBg: false
}
function drawing(id,self,config){
  var context = wx.createCanvasContext(id, self);
  drawingChart(context, config);
  context.draw();
}
function drawingChart(context, config) {
  config = {
    ...initConfig,
    ...config
  }

  var height = config.height, width = config.width, r = config.r, r1 = config.r1, categoriesNum = config.categoriesNum, categoriesName = config.categoriesName;

  var x = width / 2, y = height / 2;
  var pyl = Math.sin(45 / 180 * Math.PI) * r;//偏移量

  var maxIndex = config.maxIndex;

  // if (maxIndex == 7 || maxIndex == 6) {
  //   x = width / 2 - 15
  // }
  //画布上色
  // context.beginPath();
  // context.setFillStyle("#ffffff");
  // context.moveTo(0, 0);
  // context.lineTo(0, height);
  // context.lineTo(width,height);
  // context.lineTo(width,0);
  // context.fill();


  context.setStrokeStyle("#E6E6E6");
  context.lineWidth = "1";
  //绘制圆
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.stroke();

  context.setLineDash([6]);
  context.beginPath();
  context.arc(x, y, r1, 0, 2 * Math.PI);
  context.stroke();

  context.setLineDash([]);
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x, y + r);
  context.stroke();

  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + pyl, y + pyl);
  context.stroke();

  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + r, y);
  context.stroke();

  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + pyl, y - pyl);
  context.stroke();

  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x, y - r);
  context.stroke();

  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x - pyl, y - pyl);
  context.stroke();

  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x - r, y);
  context.stroke();

  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x - pyl, y + pyl);
  context.stroke();



  context.beginPath();

  var lineargradient1 = context.createLinearGradient(x + 40, y, x - 40, y);
  lineargradient1.addColorStop(0, "rgba(255,71,117,0.8)");//FF4775
  lineargradient1.addColorStop(0.6, "rgba(242,153,69,0.8)");//F29945
  lineargradient1.addColorStop(1, 'rgba(252,209,137,0.8)');//fcd189
  context.setFillStyle(lineargradient1);
  //语言
  context.moveTo(x, y - parseInt((categoriesNum[0] || 0) * r / 100));
  //逻辑
  context.lineTo(x - parseInt((categoriesNum[1] || 0) * pyl / 100), y - parseInt((categoriesNum[1] || 0) * pyl / 100));
  //视觉
  context.lineTo(x - parseInt((categoriesNum[2] || 0) * r / 100), y);
  //身体
  context.lineTo(x - parseInt((categoriesNum[3] || 0) * pyl / 100), y + parseInt((categoriesNum[3] || 0) * pyl / 100));
  //音乐
  context.lineTo(x, y + parseInt((categoriesNum[4] || 0) * r / 100));
  //人际
  context.lineTo(x + parseInt((categoriesNum[5] || 0) * pyl / 100), y + parseInt((categoriesNum[5] || 0) * pyl / 100));
  //自我认识
  context.lineTo(x + parseInt((categoriesNum[6] || 0) * r / 100), y);
  //自我观察
  context.lineTo(x + parseInt((categoriesNum[7] || 0) * pyl / 100), y - parseInt((categoriesNum[7] || 0) * pyl / 100));
  //context.stroke()
  context.fill();

  if (maxIndex != 0 || !categoriesNum.length) {
    drawText(context, "语言", categoriesNum[0] || 0, 16, x - 15, y - r - 30, x - 10, y - r - 10)

  } else {
    drawText(context, "语言", categoriesNum[0] || 0, 18, x - 15, y - r - 30, x - 10, y - r - 10, x - 45, y - r - 40)
  }
  if (maxIndex != 4 || !categoriesNum.length) {
    drawText(context, "音乐", categoriesNum[4] || 0, 16, x - 15, y + r + 40, x - 10, y + r + 20)
  } else {
    drawText(context, "音乐", categoriesNum[4] || 0, 18, x - 15, y + r + 40, x - 10, y + r + 20, x - 45, y + r + 10)
  }

  if (maxIndex != 2 || !categoriesNum.length) {
    drawText(context, "视觉", categoriesNum[2] || 0, 16, x - r - 40, y, x - r - 25, y + 20)
  } else {
    drawText(context, "视觉", categoriesNum[2] || 0, 18, x - r - 40, y, x - r - 35, y + 20, x - r - 75, y - 15)
  }

  if (maxIndex != 6 || !categoriesNum.length) {
    drawText(context, "自我认识", categoriesNum[6] || 0, 16, x + r + 5, y, x + r + 5, y + 20)
  } else {
    drawText(context, "自我认识", categoriesNum[6] || 0, 18, x + r + 5, y+10, x + r + 5, y + 30, x + r / 2 + 47, y - 40)
  }

  if (maxIndex != 1 || !categoriesNum.length) {
    drawText(context, "逻辑", categoriesNum[1] || 0, 16, x - r / 2 - 60, y - r / 2 - 30, x - r / 2 - 45, y - r / 2 - 10)
  } else {
    drawText(context, "逻辑", categoriesNum[1] || 0, 18, x - r / 2 - 60, y - r / 2 - 30, x - r / 2 - 55, y - r / 2 - 10, x - r / 2 - 95, y - r / 2 - 40)
  }

  if (maxIndex != 3 || !categoriesNum.length) {
    drawText(context, "身体", categoriesNum[3] || 0, 16, x - r / 2 - 60, y + r / 2 + 30, x - r / 2 - 45, y + r / 2 + 50)
  } else {
    drawText(context, "身体", categoriesNum[3] || 0, 18, x - r / 2 - 60, y + r / 2 + 30, x - r / 2 - 55, y + r / 2 + 50, x - r / 2 - 95, y + r / 2 + 15)
  }

  if (maxIndex != 7 || !categoriesNum.length) {
    drawText(context, "自我观察", categoriesNum[7] || 0, 16, x + r / 2 + 30, y - r / 2 - 30, x + r / 2 + 30, y - r / 2 - 10)
  } else {
    drawText(context, "自我观察", categoriesNum[7] || 0, 18, x + r / 2 + 30, y - r / 2 - 30, x + r / 2 + 30, y - r / 2 - 10, x + r / 2 + 33, y - r / 2 - 80)
  }

  if (maxIndex != 5 || !categoriesNum.length) {
    drawText(context, "人际", categoriesNum[5] || 0, 16, x + r / 2 + 30, y + r / 2 + 20, x + r / 2 + 30, y + r / 2 + 40)
  } else {
    drawText(context, "人际", categoriesNum[5] || 0, 18, x + r / 2 + 30, y + r / 2 + 20, x + r / 2 + 30, y + r / 2 + 40, x + r / 2 + 70, y + r / 2 + 10)
  }

  
  console.log('画图执行完毕')
}

function drawText(context, name, socre, fontSize, x1, y1, x2, y2, x3, y3) {
  context.setFontSize(fontSize);
  context.setFillStyle("#000000")
  context.fillText(name, x1, y1);
  context.setFillStyle("#FF9F00")
  context.fillText(socre, x2, y2);
  if (x3 && y3) {
    context.drawImage('/pages/images/topScore@2x.png', x3, y3, 30, 30)
  }
}

function drawingPic(id, self, config, imgUrl) {
  var maxName = initConfig.categoriesName[config.maxIndex];
  var maxScore =config.categoriesNum[config.maxIndex];
  var context = wx.createCanvasContext(id, self);
  context.drawImage('/pages/images/bg/result-bg'+config.maxIndex+'.png', 0, 0, 370, 750);
  context.setFontSize(16);
  context.setFillStyle("#ffffff");
  context.fillText("我的宝宝最好的天赋是", 30, 40);
  // context.setFontSize(36);
  // context.fillText(maxName+"天赋", 20, 80);
  context.setStrokeStyle("#ffffff");
  context.beginPath();

  context.moveTo(20, 110);
  context.lineTo(30, 100);

  context.lineTo(340, 100);
  context.lineTo(350, 110);

  context.lineTo(350, 470);
  context.lineTo(340, 480);

  context.lineTo(30, 480);
  context.lineTo(20, 470);
  context.fill();


  context.drawImage('/pages/images/result-icon.png', 30, 110, 72, 80);
  context.setFontSize(26);
  context.setFillStyle("#FE9710");
  context.fillText(maxScore + '分', 110, 150);
  context.setFontSize(16);
  context.setFillStyle("#4a4a4a");
  context.fillText("领先了全国 "+config.bfb+"% 的宝宝", 110, 180);
  context.setStrokeStyle("#ececec");
  context.setLineDash([6]);
  context.beginPath();
  context.moveTo(40, 190);
  context.lineTo(320, 190);
  context.stroke();

  drawingChart(context, {...config,width: 350,height:680});
  context.drawImage('/pages/images/icon.png', 120, 490, 120, 120);
  context.setFontSize(16);
  context.setFillStyle("#282828");
  context.fillText("长按屏幕识别小程序码进入", 90, 630);
  context.fillText("一起来测测你宝宝的天赋吧！", 80, 655);
  context.draw();
}

module.exports = { drawing, drawingPic };
