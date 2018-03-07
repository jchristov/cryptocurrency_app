import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions, ART, LayoutAnimation } from 'react-native';
import ChartPrice from './ChartPrice';
import { observer, inject } from 'mobx-react';
import ChartShape from './ChartShape';
import Colors from '../../common/Colors';
import { scaleLinear, scaleTime, scaleBand } from 'd3-scale';
import { area as d3Area, line as d3Line } from 'd3-shape';
import { extent } from 'd3-array';
import Morph from 'art/morph/path';


const { Group, Shape, Surface } = ART;

const AnimationDurationMs = 250; 
const PaddingSize = 20;
const TickWidth = PaddingSize * 2;

const dimensionWindow = Dimensions.get('window');

const INITIAL_STATE = {
  graphWidth: 0,
  graphHeight: 0,
  linePath: '',
};

@inject('charts')
@observer
class ChartList extends Component {
  static propTypes = {
  
  };

  static defaultProps = {
    width: Math.round(dimensionWindow.width * 0.9),
    height: Math.round(dimensionWindow.height * 0.5),
  };

  static createGraph = (data, width, height) => {

    const scalePriceToY = scaleLinear()
      .range([height, 20]) // ширина графика
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

  constructor(props){
    super(props);
    this.state = INITIAL_STATE;
  }

  componentWillMount(){
    this.computeNextState(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.computeNextState(nextProps);
  }

  computeNextState(nextProps){
    const {data, width, height} = nextProps;

    const fullPaddingSize = PaddingSize * 2;
    const graphWidth = width - fullPaddingSize;
    const graphHeight = height - fullPaddingSize;

    const lineGraph = ChartList.createGraph(data, graphWidth, graphHeight);

    this.setState({
      graphWidth,
      graphHeight,
      linePath: lineGraph.path,
      ticks: lineGraph.ticks,
      scale: lineGraph.scale, 
    });

    if(!this.previousGraph){
      this.previousGraph = lineGraph;
    }

    if(this.props !== nextProps){
      const pathFrom = this.previousGraph.path;
      const pathTo = lineGraph.path;

      cancelAnimationFrame(this.animating);
      this.animating = null;

      // Opt-into layout animations so our y tickLabel's animate.
      // If we wanted more discrete control over their animation behavior
      // we could use the Animated component from React Native, however this
      // was a nice shortcut to get the same effect.
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          AnimationDurationMs,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity
        )
      );

      this.setState({
        // Create the ART Morph.Tween instance.
        linePath: Morph.Tween( // eslint-disable-line new-cap
          pathFrom,
          pathTo,
        ),
      }, () => {
        // Kick off our animations!
        this.animate();
      });

      this.previousGraph = lineGraph;
    }
  }

  // This is where we animate our graph's path value.
  aminate = (start) => {
    this.animating = requestAnimationFrame((timestamp) => {
      if (!start) {
        // eslint-disable-next-line no-param-reassign
        start = timestamp;
      }

      // Get the delta on how far long in our animation we are.
      const delta = (timestamp - start) / AnimationDurationMs;

      // If we're above 1 then our animation should be complete.
      if (delta > 1) {
        this.animating = null;
        // Just to be safe set our final value to the new graph path.
        this.setState({
          linePath: this.previousGraph.path,
        });

        // Stop our animation loop.
        return;
      }

      // Tween the SVG path value according to what delta we're currently at.
      this.state.linePath.tween(delta);

      // Update our state with the new tween value and then jump back into
      // this loop.
      this.setState(this.state, () => {
        this.animate(start);
      });

    });
  }

  render() {
    const { graphHeight, graphWidth, linePath, ticks, scale } = this.state;
    
    return (
        <View style={styles.container}>
          <Surface width={graphWidth} height={graphHeight}>
            <Group x={0} y={0}>
              <Shape
                d={linePath}
                strokeWidth={1}
                stroke={Colors.black}          
              />
            </Group>
          </Surface>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

ChartList.propTypes = {

};

export default ChartList;


/**
 *   <Surface width={width} height={height}>
            <Group x={20} y={height - 20}>
              
            <Shape
              d={path}
              stroke={"#2ca02c"}
              strokeWidth={3}  
            />

            </Group>
          </Surface>
        
 */