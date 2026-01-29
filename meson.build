project('gnome-shell-accent-color', 'c',
  version: files('version')
)

api_version = '16'

prefix = get_option('prefix')
datadir = prefix / get_option('datadir')
extensions_dir= datadir / 'gnome-shell' / 'extensions'
doc_dir = datadir / 'doc'

gnome = import('gnome')

headers = [
  'st-accent-color.h'
]

sources = [
  'st-accent-color.c'
]

libmutter = dependency('libmutter-' + api_version)

dependencies = [
  libmutter
]

c_args = ['-DG_LOG_DOMAIN="StAccentColor"']

lib = library('st-accent-color',
  sources: headers + sources,
  dependencies: dependencies,
  c_args: c_args,
  install: true
)

shell_gir_dir = get_option('shell-gir-dir')

## Need to override the g-ir-compiler as include_directories
## is used only by g-ir-scanner in gnome.generate_gir
g_ir_compiler = configure_file(
  input: 'g-ir-compiler.sh.in',
  output: 'g-ir-compiler.sh',
  configuration: {
    'includedir': shell_gir_dir
  }
)

meson.override_find_program('g-ir-compiler', g_ir_compiler)

gir = gnome.generate_gir(lib,
  sources: headers + sources,
  nsversion: '0.1',
  namespace: 'StAccentColor',
  includes: [
    'St-' + api_version,
    'Cogl-' + api_version
  ],
  include_directories: [
    include_directories(shell_gir_dir)
  ],
  install: true
)

## Devdocs style documentation
custom_target('devdocs',
  command: [
    'g-ir-doc-tool',
    '--format=devdocs',
    '--language=gjs',
    '--output=@OUTPUT@',
    '--add-include-path=' + shell_gir_dir,
    '--add-include-path=' + libmutter.get_variable('girdir'),
    '@INPUT@'
  ],
  input: gir[0],
  output: 'devdocs',
  install: true,
  install_dir: doc_dir / 'libst-accent-color'
)

install_subdir('extension',
  install_dir: extensions_dir / 'accent-color@fragoi.github.com',
  strip_directory: true
)
