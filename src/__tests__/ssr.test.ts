import { describe, it, expect } from 'vitest'
import { render as ssrRender } from '../../src/entry-server'

describe('SSR', () => {
  it('render() devuelve HTML', async () => {
    const { html } = await ssrRender('/')
    expect(typeof html).toBe('string')
    expect(html.length).toBeGreaterThan(10)
  })
})
