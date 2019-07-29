# Testing Guidelines

- The testing directory is organized such that:
  - `__mocks__`: mocks components to test actions such as clicks, class instantiation, non-3rd party async functions
  - `simple-components`: react components that do not rely on other components
  - `complex-components`: react components that rely on other components

- Will not test:
  - Third-party libraries
  - Constants
  - Inline Styles
  - Nested component tests: simple components within complex components will only be tested at their own component level

- Main testing process:
  - One snapshot per component
  - Prop testing:
    - default props
    - custom values
  - Type testing:
    - check prop types (likely to be covered by PropTypes)
  - Event testing
  - State testing:
    - first check current state
    - second check state after event
