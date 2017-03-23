// THEME is injected by the Webpack Define Plugin
import {assign} from 'lodash';

const ASSETS = {
  LightOff: 'LightOff',
  LightOn: 'LightOn',
  Logo: 'Logo'
};

const Lighting = 'f208248e5969ffdb9c213257a843a0d8b8b437ae8265dd19a2398f3f212a1566';


const ACTIVE_THEME = { };
// Ab: 
// Assigning theme as Lighting, once we have backend setup ready we can get theme from 
// server and set the theme.
const theme = Lighting;
switch (theme) {
  case Lighting: { 
    require('./lighting/bootstrap_theme.css');
    require('./lighting/lighting.css');

    assign(ACTIVE_THEME, {
      [ASSETS.LightOff]: require('./lighting/img/light-off.png'),
      [ASSETS.LightOn]: require('./lighting/img/light-on.png'),
      [ASSETS.Logo]: require('./lighting/img/logo.png'),
    });

    break;
  }

}

export default angular.module('lighting_ui.theme', [])
  .constant('ACTIVE_THEME', ACTIVE_THEME);
