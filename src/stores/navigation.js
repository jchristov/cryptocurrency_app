import {observable, action, computed, toJS} from 'mobx';
import AppNavigator from '../AppNavigator';
import {NavigationActions, addNavigationHelpers} from 'react-navigation'
import BasicStore from './BasicStore';

export default class Navigation extends BasicStore {
    @observable state = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('auth'))

    @action dispatch = (action) => {
        this.state = AppNavigator.router.getStateForAction(action, this.state)
    }

    emptyFunction = () => {};
    
    @computed get config() {
        return {
            state: this.state,
            dispatch: this.dispatch
        }
    }

    /*
    const action = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: 'currencyList' })
        ]
    });
    this.props.navigation.dispatch(action);

    this.props.navigation.navigate('currencyList');

    */

    reset(routeName){
        const navi = addNavigationHelpers(this.config);

        const action = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName })
            ]
        });
        console.log(navi);
        navi.navigate('currencyList');
    }
}
