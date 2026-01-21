#include "st-accent-color.h"

struct _StThemeContext {
    GObject parent;

    void *clutter_backend;
    void *font;

    CoglColor accent_color;
    CoglColor accent_fg_color;
};

/**
 * st_accent_color_set:
 * @context: the context
 * @color: the accent color
 *
 * Sets the current accent color for the theme context.
 */
void st_accent_color_set(StThemeContext *context, CoglColor *color) {
  if (!context || !color)
    return;

  cogl_color_init_from_4f(
      &context->accent_color,
      cogl_color_get_red(color),
      cogl_color_get_green(color),
      cogl_color_get_blue(color),
      cogl_color_get_alpha(color));
}
