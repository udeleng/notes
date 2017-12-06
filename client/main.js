import { Meteor } from 'meteor/meteor';
import ReactDom from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import {routes, onAuthChange} from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
  const selectedNodeId = Session.get('selectedNodeId');

  if (selectedNodeId) {
    browserHistory.replace(`/dashboard/${selectedNodeId}`);
  }
});

Meteor.startup(() => {
  Session.set('selectedNodeId', undefined);
  ReactDom.render(routes, document.getElementById('app'));
});
