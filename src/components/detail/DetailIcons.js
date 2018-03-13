import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ConfirmModal from '../common/ConfirmModal';

class DetailIcons extends Component {
  static propTypes = {
    
  };
  state = {
    confirmModal: false
  };
  confirmDelete = () => this.setState({ confirmModal: false });
  
  cancelDelete = () => this.setState({ confirmModal: false });

  renderModalContent = () => {
    return (
      <View>
        <View>
          
        </View>
      </View>
    );
  }
 
  render() {
    return (
      <View>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="md-add" size={24} color="white"/>
        </TouchableOpacity>
        <ConfirmModal 
          visible={this.state.confirmModal}
          onConfirm={this.confirmDelete}
          onCancel={this.cancelDelete}
        >
          
        </ConfirmModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon : {
      marginHorizontal: 15
  } 
})

export default DetailIcons;