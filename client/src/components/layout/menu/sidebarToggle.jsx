import {Icon, Menu} from "semantic-ui-react";
import * as React from "react";
import {inject, observer} from "mobx-react";
import compose from "compose-function";

class SidebarToggle extends React.Component {
    render() {
        return <Menu.Item onClick={() => this.props.store.configStore.toggleSidebar()}>
            <Icon name={'content'}/>
        </Menu.Item>
    }
}


export default compose(
    inject('store'),
    observer
)(SidebarToggle);
