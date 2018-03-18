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

@inject('portfolio')
@observer
class DetailIcons extends Component {
  static propTypes = {
    cryptocurrency: PropTypes.object.isRequired
  };
  
  state = {
    confirmModal: false
  };

  confirmAdd = () => {
    const {portfolio, cryptocurrency} = this.props;
    if(portfolio.subscribeCurrency){
      portfolio.subscribeCurrency({
        price: portfolio.price,
        course: portfolio.course,
        amount: portfolio.price / portfolio.course,
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
    const {portfolio, cryptocurrency} = this.props;
    portfolio.setSelectedCurrency(cryptocurrency.name);
    portfolio.fetchPortfolioList();
    portfolio.setCourse(cryptocurrency.price_usd);
  }

  handleCourseChange = (course) => {
    if(this.props.portfolio.setCourse){
      this.props.portfolio.setCourse(course);
    }
  }

  handlePriceChange = (price) => {
    if(this.props.portfolio.setPrice){
      this.props.portfolio.setPrice(price);
    }
  }

  renderAddForm = () => {
    const { cryptocurrency, portfolio } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text>Добавьте {cryptocurrency.name} в свой криптопортфель.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Курс закупки {cryptocurrency.name} (usd):</Text>
          <TextInput
            value={portfolio.course}
            style={styles.input}
            keyboarType = 'course'
            keyboardType 	= 'numeric'
            onChangeText={this.handleCourseChange}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Баланс закупки(usd):</Text>
          <TextInput
            value={portfolio.price}
            style={styles.input}
            keyboarType = 'price'
            keyboardType 	= 'numeric'
            onChangeText={this.handlePriceChange}
          />
        </View>
      </View>
    );
  }
  
  renderDelete = () => {
    const {cryptocurrency} = this.props;
    return (
      <View>
        <TouchableOpacity style={styles.icon} onPress={this.handlePress}>
          <Ionicons name="ios-trash-outline" size={24} color="white"/>
        </TouchableOpacity>
        <ConfirmModal 
          visible={this.state.confirmModal}
          onConfirm={this.confirmAdd}
          onCancel={this.cancelAdd}
          rightButtonText="Удалить"
        >
          <Text style={styles.textModalHeader}>Удалить монету</Text>
          <Text>Вы уверены что хотите удалить {cryptocurrency.name} из своего криптопортфеля?</Text> 
          <Text>Это действие удалит всю информацию связанную с этой монетой.</Text>
        </ConfirmModal>
      </View>
    );
  }

  render() {
    const {cryptocurrency, portfolio} = this.props;

    const entities = portfolio.selectedCurrency;    
    if(entities.length) return this.renderDelete();

    return (
      <View>
        <TouchableOpacity style={styles.icon} onPress={this.handlePress}>
          <Ionicons name="md-add" size={24} color="white"/>
        </TouchableOpacity>
        <ConfirmModal 
          visible={this.state.confirmModal}
          onConfirm={this.confirmAdd}
          onCancel={this.cancelAdd}
          rightButtonText="Добавить"
        >
          { this.renderAddForm() } 
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
  textModalHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },
  icon : {
    marginHorizontal: 15
  },
});

export default DetailIcons;