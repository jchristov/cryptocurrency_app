import { scaleLinear, scaleTime, scaleBand } from 'd3-scale';
import { area as d3Area, line as d3Line } from 'd3-shape';
import { extent } from 'd3-array';


/**
 * Creates a line graph SVG path that we can then use to render in our
 * React Native application with ART.
 * @param {Array.<Object>} options.data Array of data we'll use to create
 *   our graphs from.
 * @param {number} width Width our graph will render to.
 * @param {number} height Height our graph will render to.
 * @return {Object} Object with data needed to render.
 */
function createGraph(data, width, height) {
  
  const scalePriceToY = scaleLinear()
    .range([height, 0]) // ширина графика
    .domain(extent(data, d => d.price)) //возвратит массив  из максимального и минимального элементов

  //координата x отображает дату в пределе от extent(data, d => d.time) на ширине в [0, width]
  const scaleTimeToX = scaleTime()
    .range([0, width])
    .domain(extent(data, d => d.time));

  const newArr = data.map(({ price, time }) => ({
    price: scalePriceToY(price),
    time: scaleTimeToX(time),
  }));        

  const lineShape = d3Line()
    .x(d => d.time)
    .y(d => d.price);

  return {
    data, 
    scale: {
      x: scaleTimeToX,
      y: scalePriceToY
    },
    path: lineShape(newArr),
    ticks: data.map(({price, time}) => {
      return {
        y: scalePriceToY(price),
        x: scaleTimeToX(time),
      }
    })
  }  
}

export {
  createGraph
};