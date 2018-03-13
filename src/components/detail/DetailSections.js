import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Sections from '../common/Sections';

export default class DetailSections extends Component {
  static propTypes = {
  };

  render() {
    const {lastEntities, cryptocurrency} = this.props;
    return [
        <Sections
          key="1"
          title='Market'
          style={{
            container: {
                flexDirection: 'column'
            },
            text: {
              flex: 1
            }
          }}
          data={[
            {
              title: 'Coinmarketcap Rank',
              value: cryptocurrency['rank']
            },
            {
              prefix: '$',
              title: 'Капитализация Рынка',
              value: cryptocurrency['market_cap_usd']
            },
            {
              prefix: '$',
              title: 'Объем (24 часа)',
              value: cryptocurrency['24h_volume_usd']
            },
            {
              title: 'Предложение',
              value: cryptocurrency['total_supply']
            },
            {
              title: 'Max Предложение',
              value: cryptocurrency['max_supply']
            }
          ]} 
        />,
        <Sections
          key="2"
          title='24hr Market Data'
          style={{
            container: {
              flexDirection: 'row'
            },
            text: {
              paddingRight: 4
            }
          }}
          data={[
            {
              prefix: '$',
              title: 'High:',
              value: lastEntities.high
            },
            {
              prefix: '$',
              title: 'Low:',
              value: lastEntities.low
            },
            {
              prefix: '$',
              title: 'Close:',
              value: lastEntities.close
            }
          ]}
        />
      ];
  }
}
