import '@testing-library/jest-dom'
import 'whatwg-fetch'

Object.defineProperty(HTMLElement.prototype, 'scrollTo', { value: () => {}, writable: true })
