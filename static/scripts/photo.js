function hsl(h, s, l) {
  return "hsl(" + h + "," + s * 100 + "%," + l * 100 + "%)";
}

function rgb(r, g, b) {
  return "rgb(" + r + "," + g + "," + b + ")";
}

function drawPoint(x, y, label, color, size, context) {
  if (color == null) {
    color = '#123';
  }

  if (size == null) {
    size = 1;
  }

  var radius = 0.5 * size;

  // to increase smoothing for numbers with decimal part
  var pointX = Math.round(x - radius);
  var pointY = Math.round(y - radius);

  context.beginPath();
  context.fillStyle = color;
  context.fillRect(pointX, pointY, size, size);
  context.fill();
}

var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext('2d');
myCanvas.width = 500;
myCanvas.height = 500;

var myCanvas_hsl = document.getElementById("myCanvas_hsl");
var context_hsl = myCanvas_hsl.getContext('2d');
myCanvas_hsl.width = 500;
myCanvas_hsl.height = 500;

var myCanvas_mock = document.getElementById("CanvasMock");
var context_mock = myCanvas_mock.getContext('2d');
myCanvas_mock.width = 500;
myCanvas_mock.height = 500;

var myCanvas_mock_hsl = document.getElementById("CanvasMockHsl");
var context_mock_hsl = myCanvas_mock_hsl.getContext('2d');
myCanvas_mock_hsl.width = 500;
myCanvas_mock_hsl.height = 500;

var img_info = {{img_data}};
var rgb_dataa = {{rgb_data}}
var type = {{typee}};
var global_hight = Number({{height}});
var global_width = Number({{width}});
console.log(global_hight)
console.log(global_width)
var gloab_start_x = Number({{start_x}});
var global_start_y = Number({{start_y}});

var global_hight_hsl = Number({{height_hsl}});
var global_width_hsl = Number({{width_hsl}});

var gloab_start_x_hsl = Number({{start_x_hsl}});
var global_start_y_hsl = Number({{start_y_hsl}});

var use_htl = true;
if (img_info != 0) {
  let x = gloab_start_x;
  let y = global_start_y;
  let local_img = []
  context_hsl.clearRect(0, 0, 500, 500)
  let count = 0

  for (let i = y; i < global_start_y + global_hight; i++) {
    for (let j = x; j < gloab_start_x + global_width; j++) {
      //console.log(j*500*3+i*3);
      local_img.push(img_info[i * 500 * 3 + j * 3]);
      local_img.push(img_info[i * 500 * 3 + j * 3 + 1]);
      local_img.push(img_info[i * 500 * 3 + j * 3 + 2]);
      count++;
    }
  }
  console.log(x);
  console.log(y);
  console.log(local_img)
  console.log(img_info)
  console.log(count);
  for (var i = 0; i < local_img.length; i += 3) {
    if (type === 1) {
      drawPoint(x, y, null, hsl(local_img[i], local_img[i + 1], local_img[i + 2]), 1, context_hsl);
    }
    x++
    if (x === global_width + gloab_start_x) {
      x = gloab_start_x;
      y++;
    }
    //console.log(x);
    //console.log(y);
  }
  x = gloab_start_x_hsl;
  y = global_start_y_hsl;
  local_img = []
  count = 0;
  for (let i = y; i < global_start_y_hsl + global_hight_hsl; i++) {
    for (let j = x; j < gloab_start_x_hsl + global_width_hsl; j++) {
      //console.log(j*500*3+i*3);
      local_img.push(rgb_dataa[i * 500 * 3 + j * 3]);
      local_img.push(rgb_dataa[i * 500 * 3 + j * 3 + 1]);
      local_img.push(rgb_dataa[i * 500 * 3 + j * 3 + 2]);
      count++;
    }
  }
  console.log("rgb c : ", count)
  for (var i = 0; i < local_img.length; i += 3) {

    drawPoint(x, y, null, rgb(local_img[i], local_img[i + 1], local_img[i + 2]), 1, context);

    x++;
    if (x === global_width_hsl + gloab_start_x_hsl) {
      x = gloab_start_x_hsl;
      y++;
    }
  }
}

// Save files
function handleFiles(e) {
  console.log("workfff")
  var URL = window.webkitURL || window.URL;
  var max_width = 500;
  var max_height = 500;
  var ctx = document.getElementById('myCanvas').getContext('2d');
  var url = URL.createObjectURL(e.target.files[0]);
  var img = new Image();
  img.onload = function() {
    var ratio = 1;
    if (img.width > max_width) {
      ratio = max_width / img.width;
    }
    if (ratio * img.height > max_height) {
      ratio = max_height / img.height;
    }
    ctx.scale(ratio, ratio);
    ctx.drawImage(img, 0, 0, 1000, 1000);
  };
  img.src = url;
  global_hight = 500;
  global_width = 500;
  gloab_start_x = 0;
  global_start_y = 0;
  context_hsl.clearRect(0, 0, 500, 500);
}


window.onload = function() {
  var input = document.getElementById('file-input');
  input.addEventListener('change', handleFiles, false);
  console.log("work")
};

$("#button").click(function() {
  var input = document.getElementById('file-input');
  input.click()
});

$("#button_mock").click(function() {
  var input = document.getElementById('button');
  input.click()
});

var tooltipSpan = document.getElementById('tooltip');

window.onmousemove = function(e) {
  var x = e.clientX,
    y = e.clientY;
  tooltipSpan.style.top = (y + 20) + 'px';
  tooltipSpan.style.left = (x + 20) + 'px';
};

document.getElementById("CanvasMock").addEventListener('mousemove', (e) => {
  if (rgb_dataa != 0) {
    index = 3 * (e.offsetY * 500 + e.offsetX);
    document.getElementById("tooltip").innerHTML = "RGB (" + rgb_dataa[index] + "; " + rgb_dataa[index + 1] + "; " + rgb_dataa[index + 2] + ")";
  }

});

document.getElementById("CanvasMockHsl").addEventListener('mousemove', (e) => {
  if (img_info !== 0) {
    index = 3 * (e.offsetY * 500 + e.offsetX);
    document.getElementById("tooltip").innerHTML = "HSL (" + img_info[index].toFixed(2) + "; " + img_info[index + 1].toFixed(2) + "; " + img_info[index + 2].toFixed(2) + ")";
  }
});

var canvas = document.getElementById("CanvasMock");
var ctx = canvas.getContext("2d");



// style the context
ctx.strokeStyle = "blue";
ctx.lineWidth = 3;

// calculate where the canvas is on the window
// (used to help calculate mouseX/mouseY)
var $canvas = $("#CanvasMock");
var canvasOffset = $canvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var scrollX = $canvas.scrollLeft();
var scrollY = $canvas.scrollTop();

// this flage is true when the user is dragging the mouse
var isDown = false;

// these vars will hold the starting mouse position
var startX;
var startY;


function handleMouseDown(e) {
  e.preventDefault();
  e.stopPropagation();

  // save the starting x/y of the rectangle
  startX = parseInt(e.clientX - offsetX);
  startY = parseInt(e.clientY - offsetY);

  // set a flag indicating the drag has begun
  isDown = true;
}

function handleMouseUp(e) {
  e.preventDefault();
  e.stopPropagation();

  // the drag is over, clear the dragging flag
  isDown = false;
}

function handleMouseOut(e) {
  e.preventDefault();
  e.stopPropagation();

  // the drag is over, clear the dragging flag
  isDown = false;
}

function handleMouseMove(e) {
  e.preventDefault();
  e.stopPropagation();

  // if we're not dragging, just return
  if (!isDown) {
    return;
  }

  // get the current mouse position
  mouseX = parseInt(e.clientX - offsetX);
  mouseY = parseInt(e.clientY - offsetY);

  // Put your mousemove stuff here

  // clear the canvas
  ctx.clearRect(0, 0, 500, 500);

  // calculate the rectangle width/height based
  // on starting vs current mouse position
  var width = mouseX - startX;
  var height = mouseY - startY;
  console.log(width)
  console.log(height)
  console.log(mouseX)
  console.log(mouseY)
  global_hight = height;
  global_width = width;
  gloab_start_x = startX;
  global_start_y = startY;

  use_htl = false;
  // draw a new rect from the start position
  // to the current mouse position
  ctx.strokeRect(startX, startY, width, height);

}

// listen for mouse events
$("#CanvasMock").mousedown(function(e) {
  handleMouseDown(e);
});
$("#CanvasMock").mousemove(function(e) {
  handleMouseMove(e);
});
$("#CanvasMock").mouseup(function(e) {
  handleMouseUp(e);
});
$("#CanvasMock").mouseout(function(e) {
  handleMouseOut(e);
});

var canvas_hsl = document.getElementById("CanvasMockHsl");
var ctx_hsl = canvas_hsl.getContext("2d");



// style the context
ctx_hsl.strokeStyle = "blue";
ctx_hsl.lineWidth = 3;

// calculate where the canvas is on the window
// (used to help calculate mouseX/mouseY)
var $canvas_hsl = $("#CanvasMockHsl");
var canvasOffset_hsl = $canvas_hsl.offset();
var offsetX_hsl = canvasOffset_hsl.left;
var offsetY_hsl = canvasOffset_hsl.top;
var scrollX_hsl = $canvas_hsl.scrollLeft();
var scrollY_hsl = $canvas_hsl.scrollTop();

// this flage is true when the user is dragging the mouse
var isDown_hsl = false;

// these vars will hold the starting mouse position
var startX_hsl;
var startY_hsl;


function handleMouseDown_hsl(e) {
  e.preventDefault();
  e.stopPropagation();

  // save the starting x/y of the rectangle
  startX_hsl = parseInt(e.clientX - offsetX_hsl);
  startY_hsl = parseInt(e.clientY - offsetY_hsl);

  // set a flag indicating the drag has begun
  isDown_hsl = true;
}

function handleMouseUp_hsl(e) {
  e.preventDefault();
  e.stopPropagation();

  // the drag is over, clear the dragging flag
  isDown_hsl = false;
}

function handleMouseOut_hsl(e) {
  e.preventDefault();
  e.stopPropagation();

  // the drag is over, clear the dragging flag
  isDown_hsl = false;
}

function handleMouseMove_hsl(e) {
  e.preventDefault();
  e.stopPropagation();

  // if we're not dragging, just return
  if (!isDown_hsl) {
    return;
  }

  // get the current mouse position
  mouseX_hsl = parseInt(e.clientX - offsetX_hsl);
  mouseY_hsl = parseInt(e.clientY - offsetY_hsl);

  // Put your mousemove stuff here

  // clear the canvas
  ctx_hsl.clearRect(0, 0, 500, 500);
  console.log("strtx: ", startX_hsl);
  console.log("mousx: ", mouseY_hsl);
  // calculate the rectangle width/height based
  // on starting vs current mouse position
  var width_hsl = mouseX_hsl - startX_hsl;
  var height_hsl = mouseY_hsl - startY_hsl;
  console.log(width_hsl)
  console.log(height_hsl)
  console.log("x : " + mouseX_hsl)
  console.log(mouseY_hsl)
  global_hight_hsl = height_hsl;
  global_width_hsl = width_hsl;
  gloab_start_x_hsl = startX_hsl;
  global_start_y_hsl = startY_hsl;

  // draw a new rect from the start position
  // to the current mouse position
  ctx_hsl.strokeRect(startX_hsl, startY_hsl, width_hsl, height_hsl);

}

// listen for mouse events
$("#CanvasMockHsl").mousedown(function(e) {
  handleMouseDown_hsl(e);
});
$("#CanvasMockHsl").mousemove(function(e) {
  handleMouseMove_hsl(e);
});
$("#CanvasMockHsl").mouseup(function(e) {
  handleMouseUp_hsl(e);
});
$("#CanvasMockHsl").mouseout(function(e) {
  handleMouseOut_hsl(e);
});

var link = document.getElementById("save_img")
link.addEventListener('click', function(ev) {
  console.log("doenload")
    link.href =  myCanvas_hsl.toDataURL();
    link.download = "photo.png";
}, false);

function getIMG() {
  var myImageData = context.getImageData(0, 0, 500, 500);
  var myImageData_hsl = context_hsl.getImageData(0, 0, 500, 500);
  console.log(myImageData);
  //var new_submit = document.createElement("input")
  var form = document.getElementById("hidden_form")
  //new_submit.type = "submit"
  var hidden_input = document.getElementById("hidden_input")

  var hidden_input_hsl = document.getElementById("hidden_input10")

  var hidden_input_width = document.getElementById("hidden_input2")
  var hidden_input_height = document.getElementById("hidden_input3")
  var hidden_input_startX = document.getElementById("hidden_input4")
  var hidden_input_startY = document.getElementById("hidden_input5")
  var hidden_input_width_hsl = document.getElementById("hidden_input6")
  var hidden_input_height_hsl = document.getElementById("hidden_input7")
  var hidden_input_startX_hsl = document.getElementById("hidden_input8")
  var hidden_input_startY_hsl = document.getElementById("hidden_input9")
  // form.insertBefore(new_submit, hidden_input);
  var return_data = [];
  var return_data_hsl = [];
  var counter = 0;
  for (var i = 0; i < myImageData.data.length; i++) {
    if (counter !== 3) {
      return_data.push(myImageData.data[i]);
      if (img_info !== 0 && use_htl) {
        return_data_hsl.push(myImageData_hsl.data[i])
      }
      counter++;


    } else {
      counter = 0;
    }
  }


  hidden_input.value = JSON.stringify(return_data)

  hidden_input_hsl.value = JSON.stringify(return_data_hsl)

  hidden_input_width.value = JSON.stringify(global_width)
  hidden_input_height.value = JSON.stringify(global_hight)
  hidden_input_startX.value = JSON.stringify(gloab_start_x)
  hidden_input_startY.value = JSON.stringify(global_start_y)

  hidden_input_width_hsl.value = JSON.stringify(global_width_hsl)
  hidden_input_height_hsl.value = JSON.stringify(global_hight_hsl)
  hidden_input_startX_hsl.value = JSON.stringify(gloab_start_x_hsl)
  hidden_input_startY_hsl.value = JSON.stringify(global_start_y_hsl)

  form.submit();



}

$("#imginfo").click(getIMG);

function getIMGHsl() {
  var myImageData = context.getImageData(0, 0, 500, 500);
  var myImageData_hsl = context_hsl.getImageData(0, 0, 500, 500);
  console.log(myImageData);
  //var new_submit = document.createElement("input")
  var form = document.getElementById("hidden_form_change")
  //new_submit.type = "submit"
  var hidden_input = document.getElementById("hidden_input11")

  var hidden_input_hsl = document.getElementById("hidden_input20")

  var hidden_input_width = document.getElementById("hidden_input12")
  var hidden_input_height = document.getElementById("hidden_input13")
  var hidden_input_startX = document.getElementById("hidden_input14")
  var hidden_input_startY = document.getElementById("hidden_input15")
  var hidden_input_width_hsl = document.getElementById("hidden_input16")
  var hidden_input_height_hsl = document.getElementById("hidden_input17")
  var hidden_input_startX_hsl = document.getElementById("hidden_input18")
  var hidden_input_startY_hsl = document.getElementById("hidden_input19")
  // form.insertBefore(new_submit, hidden_input);
  var return_data = [];
  var return_data_hsl = [];
  var counter = 0;
  for (var i = 0; i < myImageData.data.length; i++) {
    if (counter !== 3) {
      return_data.push(myImageData.data[i]);
      if (img_info !== 0 && use_htl) {
        return_data_hsl.push(myImageData_hsl.data[i])
      }
      counter++;


    } else {
      counter = 0;
    }
  }


  hidden_input.value = JSON.stringify(return_data)

  hidden_input_hsl.value = JSON.stringify(return_data_hsl)

  hidden_input_width.value = JSON.stringify(global_width)
  hidden_input_height.value = JSON.stringify(global_hight)
  hidden_input_startX.value = JSON.stringify(gloab_start_x)
  hidden_input_startY.value = JSON.stringify(global_start_y)

  hidden_input_width_hsl.value = JSON.stringify(global_width_hsl)
  hidden_input_height_hsl.value = JSON.stringify(global_hight_hsl)
  hidden_input_startX_hsl.value = JSON.stringify(gloab_start_x_hsl)
  hidden_input_startY_hsl.value = JSON.stringify(global_start_y_hsl)

  form.submit();



}

$("#imginfo_change").click(getIMGHsl);
