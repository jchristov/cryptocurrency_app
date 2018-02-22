//decorator === HOC
import React from 'react';

export default(OriginComponent) => class DecoratedComponent extends React.Component{
    state = {
        isOpen: false
    };

    toggleOpen = () => this.setState({isOpen: !this.state.isOpen})

    render(){
        return <OriginComponent {...this.props} {...this.state} toggleOpen={this.toggleOpen} />
    }
}