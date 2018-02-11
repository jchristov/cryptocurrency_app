import {observable, action, computed, toJS} from 'mobx';
import AppNavigator from '../AppNavigator';
import {NavigationActions, addNavigationHelpers} from 'react-navigation';
import BasicStore from './BasicStore';

export default class NavigationStore extends BasicStore {
    @observable state = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('auth'))

    @action dispatch = (action) => {
        this.state = AppNavigator.router.getStateForAction(action, this.state)
    }

    @computed get config() {
        return {
            dispatch: this.dispatch,
            state: {
                ...this.state,
                routes: toJS(this.state.routes)
            }
        }
    }

    reset(routeName){
        const action = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName })
            ]
        });
        this.dispatch(action);
    }

    goTo(routeName){
        this.dispatch(NavigationActions.navigate({routeName}));
    }
}
