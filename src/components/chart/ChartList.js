import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SectionList, View, StyleSheet, Dimensions } from 'react-native';
import { scaleLinear } from 'd3-scale';
import { timeFormat } from 'd3-time-format';
import { max, min } from 'd3-array';
import Chart from './Chart';
import ChartHeader from './ChartHeader';
import { Card } from 'react-native-elements';

export default class ChartList extends Component {
    static propTypes = {
    };
    
    constructor(...args){
        super(...args);
        this.format = timeFormat('%B, %Y');
        const {width, height} = Dimensions.get('window');
        this.height = height;
        this.width = width;
        this.numToRender = Math.round(this.width / 10);
    }

    sections = () => {
        let sections = [];
        this.props.data.reverse().forEach((data, index)=>{
            const scaled = parseInt(this.scales.height(data[1]), 10);
            const title = this.format(data[0]) ;
            const item 	= {
                key 	: data [ 0 ] + ':' + index ,
                value 	: scaled 
            };

            if(scaled && (index === 0 || 
                                        (sections [ sections.length - 1 ] && 
                                        sections [ sections.length - 1 ].title !== title))) {
				sections.push ({
					data: [item] ,
					title: title
				});
			}
			else if(scaled && sections [sections.length - 1]){
				sections[sections.length - 1].data.push(item);
			}
        });
        
        return sections;
    }

    _renderItem = ({index, item, section}) => {
        const climbing 	= section.data[index + 1] ? item.value >= section.data [ index + 1 ].value : true; 
		const pigment 	= climbing 	? '#00cc00' : '#cc0000';
				
        const beginning = ! index;
        const end = index === section.data.length - 1;
        const padding = {
            left: beginning ? 2 : 1,
            right: end ? 2 : 1
        };
        return <Chart value={item.value} padding = {padding} color={pigment} />
    }

    setScales() {
		this.scales = {			
			height : scaleLinear ()
				.domain ([ 
					0 ,
					max ( this.props.data , ( item ) => item [ 1 ])
				])
				.range ([ 
                    0 ,
                    this.height / 3 
				])
		};
	}

    _renderHeader = ({section}) => {
        return <ChartHeader value={section.title} />
    }

    _renderPrice = () => {
        const {data} = this.props;
        
    }

    render() {
        this.setScales();
        return (
            <View style={styles.container}>
                {this._renderPrice}
                <SectionList
                    horizontal={true}
                    initialNumToRender={this.numToRender}
                    sections={this.sections()}
                    renderSectionHeader={this._renderHeader}
                    renderItem={this._renderItem}
                    style={styles.chart}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row' ,
		flex: 1
    },
    chart:{
        flex 	: 1 , 
        height 	: 230
    }
});