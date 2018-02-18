import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SectionList, View, StyleSheet } from 'react-native';
import { scaleLinear } 	from 'd3-scale';
import { timeFormat } 	from 'd3-time-format';
import { max, min } 	from 'd3-array';

export default class ChartList extends Component {
    static propTypes = {
    };
    
    sections = () => {
        this.props.data.reverse().forEach((data, index)=>{
            const scaled = parseInt(this.scales.height ( data [ 1 ]) , 10 )
            const title = this.format ( data [ 0 ]) 
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

    setScales () {
		this.scales = {			
			height : scaleLinear ()
				.domain ([ 
					0 ,
					max ( this.props.data , ( item ) => item [ 1 ])
				])
				.range ([ 
					0 , 
					device.height / 3
				])
		};
	}

    row = () => {

    }

    render() {
        this.setScales();

        return (
            <View style={styles.container}>
                <SectionList
                    horizontal={true}
                    sections={this.sections()}
                    renderItem={this.row}
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