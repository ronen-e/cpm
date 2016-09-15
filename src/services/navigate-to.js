import { browserHistory } from 'react-router';

function navigateTo(path) {
    browserHistory.push(path);
}

export default navigateTo;
