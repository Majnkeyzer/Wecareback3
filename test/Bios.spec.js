import { shallowMount } from '@vue/test-utils'
import Filmbeheer from '../src/components/Filmbeheer'

describe('Filmbeheer.vue', () => {
    it('testing FilmBeheer', () => {
      const wrapper = shallowMount(Filmbeheer)
      const message = wrapper.find('h1').text();
      expect(message).toBe('Filmbeheer')
    })
})
