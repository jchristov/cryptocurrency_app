import BasicStore from './BasicStore';
import { action, observable } from 'mobx';

export default class SearchStore extends BasicStore{
    @observable value = null;
    @observable isOpen = false;

    @action setValue = value => this.value = value
    @action toggleOpen = () => this.isOpen = !this.isOpen
}