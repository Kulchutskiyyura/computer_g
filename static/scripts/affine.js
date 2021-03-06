// Initializing the canvas with coordinates
var b = JXG.JSXGraph.initBoard('box', {
  boundingbox: [-{{max_x}}, -{{max_y}}, {{max_x}}, {{max_y}}],
  axis: true,
  grid: true
});

// Dynamic change for vertice- and center-based rotation
let verticeCheck = document.getElementById("vertice-check");
verticeCheck.addEventListener('change', (event) => {
  console.log("changeeeeee")
  let select = document.getElementById("vertice-option");
  let value = verticeCheck.value;
  if (value == 1) {
    $('#tops_list').show();
    console.log("hiden")
  } else {
    //select.hidden = true;
    console.log("viz")
    $('#tops_list').hide()
  }
});

// Hexagon part
let global_points = {}
let global_line_array = []
let global_point_array = []

function return_real_x(x, x_min, x_max) {
  console.log("real_x: ", x)
  return Math.round(((x - x_min) / (x_max - x_min)) * 500)
}

function return_real_y(y, y_min, y_max) {
  return Math.round(500 - (((y - y_min) / (y_max - y_min)) * 500))
}

function rotate(x, y, x_zero, y_zero, deg) {
  let sin_cos = [
    [Math.cos(deg), Math.sin(deg)],
    [-Math.sin(deg), Math.cos(deg)]
  ];
  console.log("sin_cos", sin_cos)

  let x_y_to_center = [x - x_zero, y - y_zero]

  let zero_cordinate = [x_zero, y_zero]

  let mul_result = [
    [sin_cos[0][0] * x_y_to_center[0] + sin_cos[0][1] * x_y_to_center[1]],
    [sin_cos[1][0] * x_y_to_center[0] + sin_cos[1][1] * x_y_to_center[1]]
  ];
  console.log("mul_result", mul_result);
  let result = [zero_cordinate[0] + Number(mul_result[0]), zero_cordinate[1] + Number(mul_result[1])];
  console.log("result", result);
  return result;
}

function draw_hexagon(x_center, y_center, x, y) {
  let begin_x = x;
  let begin_y = y;
  let point_name = ["A", "B", "C", "D", "E", "F"]
  let first_point = b.create('point', [x, y], {
    name: point_name[0],
    size: 4
  });
  global_point_array.push(first_point);
  global_points[point_name[0]] = [x, y];
  for (let i = 0; i < 5; i++) {
    let x_next;
    let y_next;
    console.log("draw: ", i);
    [x_next, y_next] = rotate(x, y, x_center, y_center, Math.PI / 3)

    global_points[point_name[i + 1]] = [x_next, y_next];
    let second_point = b.create('point', [x_next, y_next], {
      name: point_name[i + 1],
      size: 4
    });
    global_points[point_name[i + 1]] = [x_next, y_next];
    global_point_array.push(second_point)

    b.create('line', [point_name[i], point_name[i + 1]], {
      strokeColor: '#00ff00',
      strokeWidth: 2,
      straightFirst: false,
      straightLast: false,
      strokeWidth: 2
    });
    first_point = second_point

    y = y_next;
    x = x_next;

  }
  b.create('line', ["A", "F"], {
    strokeColor: '#00ff00',
    strokeWidth: 2,
    straightFirst: false,
    straightLast: false,
    strokeWidth: 2
  });
}


// Affine transformation
function rotate_hexagon(x_center, y_center) {
  let coef = 1.009 // Little scale
  global_point_array[0].moveTo(rotate(global_points["A"][0] * coef, global_points["A"][1] * coef, x_center, y_center, Math.PI / 12), 1000)
  global_points["A"] = rotate(global_points["A"][0] * coef, global_points["A"][1] * coef, x_center, y_center, Math.PI / 12)
  global_point_array[1].moveTo(rotate(global_points["B"][0] * coef, global_points["B"][1] * coef, x_center, y_center, Math.PI / 12), 1000)
  global_points["B"] = rotate(global_points["B"][0] * coef, global_points["B"][1] * coef, x_center, y_center, Math.PI / 12)
  global_point_array[2].moveTo(rotate(global_points["C"][0] * coef, global_points["C"][1] * coef, x_center, y_center, Math.PI / 12), 1000)
  global_points["C"] = rotate(global_points["C"][0] * coef, global_points["C"][1] * coef, x_center, y_center, Math.PI / 12)
  global_point_array[3].moveTo(rotate(global_points["D"][0] * coef, global_points["D"][1] * coef, x_center, y_center, Math.PI / 12), 1000)
  global_points["D"] = rotate(global_points["D"][0] * coef, global_points["D"][1] * coef, x_center, y_center, Math.PI / 12)
  global_point_array[4].moveTo(rotate(global_points["E"][0] * coef, global_points["E"][1] * coef, x_center, y_center, Math.PI / 12), 1000)
  global_points["E"] = rotate(global_points["E"][0] * coef, global_points["E"][1] * coef, x_center, y_center, Math.PI / 12)
  global_point_array[5].moveTo(rotate(global_points["F"][0] * coef, global_points["F"][1] * coef, x_center, y_center, Math.PI / 12), 1000)
  global_points["F"] = rotate(global_points["F"][0] * coef, global_points["F"][1] * coef, x_center, y_center, Math.PI / 12)
  console.log(global_points)
}

let draw = {
  {
    draw
  }
};
if (draw === 1) {
  draw_hexagon({
    {
      center_x
    }
  }, {
    {
      center_x
    }
  }, {
    {
      top_x
    }
  }, {
    {
      top_y
    }
  });

  let type = {
    {
      typee
    }
  }
  if (type === 0) {
    setInterval(rotate_hexagon, 1100, {
      {
        center_x
      }
    }, {
      {
        center_x
      }
    })
  } else {
    setInterval(rotate_hexagon, 1100, global_points["{{top}}"][0], global_points["{{top}}"][1]);
  }
}


document.getElementById('btn-download').addEventListener("click", function(e) {
  var canvas = document.querySelector('#my-canvas');

  var dataURL = canvas.toDataURL("image/jpeg", 1.0);

  downloadImage(dataURL, 'my-canvas.jpeg');
});

// Save | Download image
function downloadImage(data, filename = 'untitled.jpeg') {
  var a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}
