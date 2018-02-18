import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SectionList, View, StyleSheet } from 'react-native';
import { scaleLinear } from 'd3-scale';
import { timeFormat } from 'd3-time-format';
import { max, min } from 'd3-array';
import Chart from './Chart';

export default class ChartList extends Component {
    static propTypes = {
    };
    
    format = timeFormat('%B, %Y');

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
        const beginning = ! index;
        const end = index === section.data.length - 1;
        const padding = {
            left: beginning ? 2 : 1,
            right: end ? 2 : 1
        };
        return <Chart value={item.value} padding = {padding} />
    }

    setScales () {
		this.scales = {			
			height : scaleLinear ()
				.domain ([ 
					0 ,
					max ( this.props.data , ( item ) => item [ 1 ])
				])
				.range ([ 
                    0 ,
                    300 
					//device.height / 3
				])
		};
	}

    render() {
        this.setScales();

        return (
            <View style={styles.container}>
                <SectionList
                    horizontal={true}
                    sections={this.sections()}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row' ,
		flex: 1
    }
});