import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('home.vue', () => {
  it('should have the home class', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.classes()).toContain('home');
  });
});
