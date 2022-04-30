import React from 'react';
import ReactDOM from 'react-dom';
import DealsHome from './components/dealshome';
function Index() {
    return (
        <div>
            <DealsHome />
        </div>
    );
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}