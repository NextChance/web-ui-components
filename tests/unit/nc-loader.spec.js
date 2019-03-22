import { shallowMount } from "@vue/test-utils";
import ncLoader from "@/components/nc-loader.vue";

describe("ncLoader", () => {
  it("renders props", () => {
    const text = "loading";
    const active = true;
    const hasText = true;
    const hasVeil = true;
    const veilColor = "#272727";
    const textColor = "#272728";
    const iconColor = "#272729";
    const wrapper = shallowMount(ncLoader, {
      propsData: {
        text: text,
        active: active,
        hasText: hasText,
        hasVeil: hasVeil,
        veilColor: veilColor,
        textColor: textColor,
        iconColor: iconColor
      }
    });
    expect(wrapper.props().text).toMatch(text);
    expect(wrapper.props().active).toBe(active);
    expect(wrapper.props().hasText).toBe(hasText);
    expect(wrapper.props().hasVeil).toBe(hasVeil);
    expect(wrapper.props().veilColor).toBe(veilColor);
    expect(wrapper.props().textColor).toBe(textColor);
    expect(wrapper.props().iconColor).toBe(iconColor);
  });
});
