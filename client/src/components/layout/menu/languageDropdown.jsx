import * as React from "react";
import {Dropdown} from "semantic-ui-react";
import {AVAILABLE_LANGUAGES} from "../../../i18n";
import {inject, observer} from "mobx-react";
import compose from "compose-function";

class LanguageDropdown extends React.Component {
    render(){
        return <Dropdown item simple className={'right'} text={this.props.store.configStore.language}>
            <Dropdown.Menu>
                {
                    AVAILABLE_LANGUAGES.map(locale => {
                        return <Dropdown.Item key={locale}
                                              onClick={() => this.props.store.configStore.language = locale}>{locale}</Dropdown.Item>;
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    }
}


export default compose(
    inject('store'),
    observer
)(LanguageDropdown);