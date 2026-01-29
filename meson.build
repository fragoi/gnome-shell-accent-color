project('gnome-shell-accent-color', 'c',
  version: files('version')
)

api_version = '16'

prefix = get_option('prefix')
datadir = prefix / get_option('datadir')
extensions_dir= datadir / 'gnome-shell' / 'extensions'

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

## Script to generate documentation
g_ir_doc_tool = configure_file(
  input: 'g-ir-doc-tool.sh.in',
  output: 'g-ir-doc-tool.sh',
  configuration: {
    'output': meson.current_build_dir() / 'doc',
    'shell_gir_dir': shell_gir_dir,
    'mutter_gir_dir': libmutter.get_variable('girdir'),
    'gir_file': gir[0].full_path()
  }
)

install_subdir('extension',
  install_dir: extensions_dir / 'accent-color@fragoi.github.com',
  strip_directory: true
)
