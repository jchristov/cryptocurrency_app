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
    cryptocurrency: PropTypes.object.isRequired
  };
  
  state = {
    confirmModal: false
  };

  confirmAdd = () => {
    const {user, cryptocurrency} = this.props;
    if(user.addCryproCurrency){
      user.addCryproCurrency({
        price: user.price,
        course: user.course,
        amount: user.price / user.course,
        coinName: cryptocurrency.name,
        whnCrt: new Date(),
        whnUpt: new Date()
      });
    }

    this.setState({ 
      confirmModal: false 
    });
  }
  
  cancelAdd = () => this.setState({ confirmModal: false });

  handlePress = () => this.setState({ confirmModal: true });

  componentWillMount(){
    const {user, cryptocurrency} = this.props;

    user.fetchPortfolioList();
    user.setCourse(cryptocurrency.price_usd);
  }

  handleCourseChange = (course) => {
    if(this.props.user.setCourse){
      this.props.user.setCourse(course);
    }
  }

  handlePriceChange = (price) => {
    if(this.props.user.setPrice){
      this.props.user.setPrice(price);
    }
  }

  renderModalContent = () => {
    const { cryptocurrency, user } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text>Добавьте {cryptocurrency.name} в свой криптопортфель.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Курс закупки {cryptocurrency.name} (usd):</Text>
          <TextInput
            value={user.course}
            style={styles.input}
            keyboarType = 'course'
            keyboardType 	= 'numeric'
            onChangeText={this.handleCourseChange}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Баланс закупки(usd):</Text>
          <TextInput
            value={user.price}
            style={styles.input}
            keyboarType = 'price'
            keyboardType 	= 'numeric'
            onChangeText={this.handlePriceChange}
          />
        </View>
      </View>
    );
  }
  
  render() {
    console.log('--', this.props.user.entities);

    return (
      <View>

        <TouchableOpacity style={styles.icon} onPress={this.handlePress}>
          <Ionicons name="md-add" size={24} color="white"/>
        </TouchableOpacity>
        <ConfirmModal 
          visible={this.state.confirmModal}
          onConfirm={this.confirmAdd}
          onCancel={this.cancelAdd}
        >
          { this.renderModalContent() } 
        </ConfirmModal>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',

  },
  section:{
    marginBottom 	: 15,
    alignItems: 'flex-start'
  },
  input: {
    flexDirection: 'row',
    borderRadius: 5,
    width: '100%',
    color: Colors.darkText,
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderColor: Colors.border,
        minHeight: 36,
      },
      android: {
        minHeight: 46,
      },
    }),
  },
  inputReadOnly:{
    backgroundColor: Colors.border
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  icon : {
    marginHorizontal: 15
  },
});

export default DetailIcons;