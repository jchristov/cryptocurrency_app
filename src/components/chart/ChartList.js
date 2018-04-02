import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions, ART, LayoutAnimation, ActivityIndicator } from 'react-native';
import ChartPrice from './ChartPrice';
import { observer, inject } from 'mobx-react';
import Colors from '../common/Colors';
import Morph from 'art/morph/path';
import VerticalChartAxis from './VerticalChartAxis';
import Loader from '../common/Loader';
import  * as graphUtils  from './graph-utils';

const { Group, Shape, Surface } = ART;
const AnimationDurationMs = 100; 
const PaddingSize = 40;
const TickWidth = PaddingSize * 2;
const dimensionWindow = Dimensions.get('window');

const INITIAL_STATE = {
  graphWidth: 0,
  graphHeight: 0,
  linePath: '',
  areaPath: ''
};

class ChartList extends Component {
  static propTypes = {
  };

  static defaultProps = {
    width: Math.round(dimensionWindow.width * 0.9),
    height: Math.round(dimensionWindow.height * 0.5),
  };

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

    const lineGraph = graphUtils.createGraph(data.entities, graphWidth, graphHeight);

    this.setState({
      graphWidth,
      graphHeight,
      linePath: lineGraph.linePath,
      areaPath: lineGraph.areaPath,
      ticks: lineGraph.ticks,
      scale: lineGraph.scale, 
    });

    if(!this.previousGraph){
      this.previousGraph = lineGraph;
    }

    if(this.props !== nextProps){
      const pathFrom = this.previousGraph.linePath;
      const pathTo = lineGraph.linePath;

      const areaFrom = this.previousGraph.areaPath;
      const areaTo = lineGraph.areaPath;

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
        areaPath: Morph.Tween(
          areaFrom,
          areaTo
        )
      }, () => {
        // Kick off our animations!
        this.animate();
      });

      this.previousGraph = lineGraph;
    }
  }

  // This is where we animate our graph's path value.
  animate = (start) => {
    this.animating = requestAnimationFrame((timestamp) => {
      if (!start) {
        start = timestamp;
      }

      // Get the delta on how far long in our animation we are.
      const delta = (timestamp - start) / AnimationDurationMs;

      // If we're above 1 then our animation should be complete.
      if (delta > 1) {
        this.animating = null;
        // Just to be safe set our final value to the new graph path.
        this.setState({
          linePath: this.previousGraph.linePath,
          areaPath: this.previousGraph.areaPath
        });

        // Stop our animation loop.
        return;
      }

      // Tween the SVG path value according to what delta we're currently at.
      this.state.linePath.tween(delta);
      this.state.areaPath.tween(delta);

      // Update our state with the new tween value and then jump back into
      // this loop.
      this.setState(this.state, () => {
        this.animate(start);
      });

    });
  }

  render() {
    const { data } = this.props;
    const { graphHeight, graphWidth, areaPath, linePath, ticks, scale } = this.state;

    return (
        <View style={styles.container}>
          <VerticalChartAxis
            data={data.entities}
            textAlign="left"
          />
          <View style={styles.chart}>
            { data.loading && <ActivityIndicator size="small" animating />}
            <Surface width={graphWidth} height={graphHeight}>
                <Group x={0} y={0}>
                  <Shape
                    d={linePath}
                    strokeWidth={2}
                    stroke={'#FFB01E'}
                  />
                  <Shape
                    d={areaPath}
                    strokeWidth={2}
                    fill={'#FFEBC5'}
                  />
                </Group>
            </Surface>
          </View>
          <VerticalChartAxis
            data={data.entities}
            textAlign="right"
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
   
    flex: 1,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  chart: {
    flex: 1
  }
});

ChartList.propTypes = {
  data: PropTypes.object.isRequired
};

export default ChartList;
