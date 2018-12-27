import * as React from "react";
import config from "../../config";

class DebugFooter extends React.Component {
    render() {
        if (process.env.NODE_ENV === 'production'){
            return null;
        }

        return <div className={'debug-footer'}>
            <small>env: {process.env.NODE_ENV}</small>
            <small>ws-root: {config.WS_ROOT}</small>
        </div>
    }
}

export default DebugFooter;
