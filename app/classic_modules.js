import './components';
import './login';
import './sample';
import './sampleTwo';
import './dashboard';



export default angular.module('lighting-ui.classic-modules', [
  'global-libraries',
  'lighting-ui-components',
  'lighting-ui-login',
  'lighting-ui-sampleTwo',
  'lighting-ui-dashboard'
]);
