/**
 * https://stylelint.io/user-guide/rules/list
*/
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier', 'stylelint-config-sass-guidelines'],
  "ignoreFiles": ['node_modules', '**/*.js', '**/*.json', '**/*.png', '**/*.md', '**/*.otf', '**/*.ttf', '**/*.woff', '**/*.html', '**/*.css', '**/*.txt'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  defaultSeverity: 'warning',
  rules: {
    'color-no-invalid-hex': true,
    'font-family-no-duplicate-names': true,
    'font-family-no-missing-generic-family-keyword': true,
    'color-hex-length': 'long',
    'number-leading-zero': 'never',
    'max-nesting-depth': 4,
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute']
      }
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['box-orient', 'interpolation-mode']
      }
    ],
    'selector-max-id': 1
  }
}
