function send_ajax_teh(name, type) {
  // console.log("ajax work")
  $.post(
    url = "http://127.0.0.1:5000/",

    {
      input_name: name,
      input_type: type
    }
  );
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

colors1 = {
  "0": [220, 20, 60],
  "1": [255, 0, 0],
  "2": [178, 34, 34],
  "3": [139, 0, 0]
}
colors2 = {
  "0": [50, 205, 50],
  "1": [0, 255, 0],
  "2": [124, 252, 0],
  "3": [173, 255, 47]
}
colors3 = {
  "0": [64, 224, 208],
  "1": [0, 206, 209],
  "2": [70, 130, 180],
  "3": [0, 128, 128]
}
colors4 = {
  "0": [255, 255, 0],
  "1": [255, 215, 0],
  "2": [255, 165, 0],
  "3": [255, 140, 0]
}
var color_models = [colors1, colors2, colors3, colors4]
var obj = {
  {
    json_obj
  }
}
var color_type = {
  {
    color_type
  }
}

x = 0
y = 0
for (var i = 0; i < obj[0].length; i++) {
  arr = [0, 0, 0]
  //console.log(i)
  if (obj[0][i] != -1) {
    arr = color_models[color_type][obj[0][i]]
    //console.log(color_type)
    if (arr[obj[0][i]] + obj[1][i] < 255) {
      arr[obj[0][i]] += obj[1][i] % 10;
    } else {
      arr[obj[0][i]] = 255;
    }
    // arr[0] += obj[1][i]

  }

  drawPoint(x, y, null, rgb(...arr), 1, context);
  x++;
  if (x === 500) {
    x = 0;
    y++;
  }
}


// Scale fractal
$("#myCanvas").dblclick(function(e) {
  var form = $('<form action="http://127.0.0.1:5000/" method="POST">' +
    '<input type="hidden" name="x_pos" value="' + e.offsetX + '">' +
    '<input type="hidden" name="y_pos" value="' + e.offsetY + '">' +
    '<input type="hidden" name="type" value="' + "ajax" + '">' +
    '</form>')
  $(document.body).append(form);
  form.submit();
});
