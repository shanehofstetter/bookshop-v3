import * as React from 'react';
import {withNamespaces} from "react-i18next";
import {Container, Menu} from "semantic-ui-react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import {route} from "../../routing/routing";
import SidebarToggle from "./menu/sidebarToggle";
import LanguageDropdown from "./menu/languageDropdown";
import UserMenu from "./menu/userMenu";
import HomeMenuItem from "./menu/homeMenuItem";
import compose from "compose-function";

class NavigationBar extends React.Component {

    render() {
        return (
                <Menu id={'navbar'} className={'fixed ' + (this.props.store.configStore.mobile ? 'mobile' : 'desktop')}>
                    {this.props.store.configStore.mobile ? <SidebarToggle/> : ''}
                    <Container>
                        {this.props.store.configStore.mobile ? <HomeMenuItem/> : ''}
                        <Menu className={'right'}>
                            {this.props.store.authStore.authenticated ? <UserMenu/> : this.renderLoginMenu()}
                            <LanguageDropdown/>
                        </Menu>
                    </Container>
                </Menu>
        );
    }

    renderLoginMenu() {
        return <Menu.Item as={Link} to={route('/login')}>Login</Menu.Item>
    }
}


export default compose(
    withNamespaces('translation'),
    inject('store'),
    observer
)(NavigationBar);