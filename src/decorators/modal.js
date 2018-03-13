import React from 'react';

export default (OriginComponent) => class DecoratedComponent extends React.Component{
  state = {
    confirmModal: false
  };
  
  confirmModal = () => this.setState({confirmDelete: true});

  confirmDelete = () => this.setState({ confirmModal: false });
  
  cancelDelete = () => this.setState({ confirmModal: false });

  render(){
    return (
      <OriginComponent 
        {...this.props} 
        {...this.state}  
        confirmDelete={this.confirmDelete} 
        cancelDelete={this.cancelDelete}
      />
    );
  }

}