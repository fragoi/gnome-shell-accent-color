'use strict';

import St from 'gi://St';
import Cogl from 'gi://Cogl';
import StAccentColor from 'gi://StAccentColor';

import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

const NAME = 'Accent Color';
const GSETTINGS_ID = 'org.gnome.shell.extensions.com-github-fragoi-accent-color';

const COLOR = '#3f7950';
// const COLOR = '#a04d69';

/**
 * @type {(msg: string) => void}
 */
var _log;

function getThemeContext() {
  return St.ThemeContext.get_for_stage(global.stage);
}

/**
 * Fakes a change in the theme in order to invalidate
 * the nodes cache of the theme context.
 * Note that theme context is connected to this event
 * and properly handles it, on the other hand directly
 * emitting the 'changed' event on the theme context
 * does not yeld to the same result.
 * 
 * @param {St.ThemeContext} context 
 */
function emitThemeChanged(context) {
  const theme = context.get_theme();
  theme.emit('custom-stylesheets-changed');
}

export default class MyExtension extends Extension {
  enable() {
    // const gsettings = this.getSettings(GSETTINGS_ID);

    const context = getThemeContext();
    const [prevColor] = context.get_accent_color();
    const [, color] = Cogl.Color.from_string(COLOR);

    this._prevColor = prevColor;

    StAccentColor.set(context, color);
    emitThemeChanged(context);

    log(`${NAME} enabled`);
  }

  disable() {
    const context = getThemeContext();

    StAccentColor.set(context, this._prevColor);
    emitThemeChanged(context);

    this._prevColor = null;

    log(`${NAME} disabled`);
  }
}
