import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ART, LayoutAnimation } from 'react-native';

const { Shape } = ART;

class ChartShape extends Component {
  
  constructor(props){
    super(props);
    this.state = INITIAL_STATE;
  }
  


  render() {
    const {path} = this.state;
    
    return (
      <Shape
        d={path}
      />
    );
  }
}

ChartShape.propTypes = {

};

export default ChartShape;