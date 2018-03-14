import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Text, 
  TextInput, 
  Platform,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ConfirmModal from '../common/ConfirmModal';
import { observer, inject } from 'mobx-react';
import Colors from '../common/Colors';

const { width } = Dimensions.get('window');

@inject('user')
@observer
class DetailIcons extends Component {
  static propTypes = {
    
  };
  
  state = {
    confirmModal: false
  };

  confirmDelete = () => this.setState({ confirmModal: false });
  
  cancelDelete = () => this.setState({ confirmModal: false });

  handlePress = () => this.setState({ confirmModal: true });

  renderModalContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.text}>Колличество:</Text>
          <TextInput
            value=''
            style={styles.input}
            keyboarType = 'amount'
            onChangeText={() => {}}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Стоимость:</Text>
          <TextInput
            value=''
            style={styles.input}
            keyboarType = 'price'
            onChangeText={() => {}}
          />
        </View>
      </View>
    );
  }
 
  render() {
    return (
      <View>
        <TouchableOpacity style={styles.icon} onPress={this.handlePress}>
          <Ionicons name="md-add" size={24} color="white"/>
        </TouchableOpacity>
        <ConfirmModal 
          visible={this.state.confirmModal}
          onConfirm={this.confirmDelete}
          onCancel={this.cancelDelete}
        >
          { this.renderModalContent() }
        </ConfirmModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  section:{
    flexDirection: 'row',
    width: width
  },
  icon : {
      marginHorizontal: 15
  },
  text: {
    fontWeight: 'bold',
    flex: 1
  },
  input: {
    marginLeft: 15,
    marginRight: 15,
    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        minHeight: 36,
        marginLeft: 20,
        marginRight: 20,
      },
      android: {
        minHeight: 46
      },
    }),
  }
});

export default DetailIcons;