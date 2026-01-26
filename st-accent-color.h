/*
 * TODO: description
 */

#ifndef ST_ACCENT_COLOR_H_
#define ST_ACCENT_COLOR_H_

#include <cogl/cogl.h>

typedef struct _StThemeContext StThemeContext;

CoglColor *st_accent_color_get(StThemeContext *context);

void st_accent_color_set(StThemeContext *context, CoglColor *color);

#endif /* ST_ACCENT_COLOR_H_ */
