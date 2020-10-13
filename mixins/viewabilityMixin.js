// https://github.com/Akryum/vue-observe-visibility

const eventName = 'viewability-done'

export default {
  data() {
    return {
      viewabilityConfig: {
        callback: this.visibilityChanged,
        once: true,
        throttle: 1000,
        intersection: {
          threshold: 0.5
        }
      }
    }
  },
  methods: {
    visibilityChanged(isVisible, IOEntry) {
      if (isVisible) {
        const isVueComponent = IOEntry.target.__vue__
        if (isVueComponent) {
          // directive was binded to VUE component
          IOEntry.target.__vue__.$emit(eventName)
        } else {
          //directive was binded to native DOM element
          const event = new CustomEvent(eventName)
          IOEntry.target.dispatchEvent(event)
        }
      }
    }
  }
}
