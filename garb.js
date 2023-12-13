
// myDivContainer.on('plotly_click', function(data) {
//   const point = data.points[0]
//   console.log(point);
//   const newAnnotation = {
//     xref: 'paper',
//     // x: 0.95,
//     // y: dataProd[1]?.value, "2017-03-20"
//     // x: dataProd[1]?.date.split(' ')[0],
//     // x: dataProd[1]?.date,
//     // y: dataProd[1]?.value,
//     x: point.xaxis.d2l(point.x),
//     y: point.yaxis.d2l(point.y),
//     // xanchor: 'right',
//     // yanchor: 'middle',
//     // text: dataProd[1]?.value + '',
//     text: '<i>Пятница, Июнь 15, 05:01</i><br>' + 
//     '<i>Добыто (сутки): </i> '+(point.y),
//     arrowcolor: '#DEB887',
//     bordercolor: '#DEB887',
//     bgcolor: 'rgba(255, 255, 255, 0.9)',
//     borderwidth: 3,
//     borderpad: 4,
//     // showarrow: false,
//     arrowhead: 6,
//     ax: 0,
//     ay: -80,
//     font: {
//       family: 'Arial',
//       size: 16,
//       color: 'black'
//     }
//   };
//   const divid = document.getElementById('myDiv');
//   const newIndex = (divid.layout.annotations || []).length;
//   console.log(point.pointNumber);
//   if(newIndex) {
//     var foundCopy = false;
//     divid.layout.annotations.forEach(function(ann, sameIndex) {
//       if(ann.text === newAnnotation.text ) {
//         Plotly.relayout('myDiv', 'annotations[' + sameIndex + ']', 'remove');
//         foundCopy = true;
//       }
//     });
//     if(foundCopy) return;
//   }
//   Plotly.relayout('myDiv', 'annotations[' + newIndex + ']', newAnnotation);
// }).on('plotly_clickannotation', function(event, data) {
//   Plotly.relayout('myDiv', 'annotations[' + data.index + ']', 'remove');
// });
