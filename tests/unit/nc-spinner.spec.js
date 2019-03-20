import { shallowMount } from "@vue/test-utils";
import ncSpinner from "@/components/nc-spinner.vue";

describe("ncSpinner", () => {
  it("renders props", () => {
    const text = "loading";
    const active = true;
    const hasText = true;
    const hasVeil = true;
    const wrapper = shallowMount(ncSpinner, {
      propsData: {
        text: text,
        active: active,
        hasText: hasText,
        hasVeil: hasVeil
      }
    });
    expect(wrapper.props().text).toMatch(text);
    expect(wrapper.props().active).toBe(active);
    expect(wrapper.props().hasText).toBe(hasText);
    expect(wrapper.props().hasVeil).toBe(hasVeil);
  });
});
