import {observable, action, computed, toJS} from 'mobx';
import AppNavigator from '../AppNavigator';
import {NavigationActions} from 'react-navigation'

class Navigation{
    @observable state = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('auth'))

    @action dispatch = (action) => {
        this.state = AppNavigator.router.getStateForAction(action, this.state)
    }

    @computed get config() {
        return {
            state: this.state,
            dispatch: this.dispatch
        }
    }
}

export default Navigation;