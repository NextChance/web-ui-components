export const defaultProps = {
  paginationActiveClass: 'active',
  paginationStyle: undefined,
  hideButtons: false,
  leftLinkText: 'Previous',
  rightLinkText: 'Next',
  linksDefaultAction: false,
  leftLinkStyle: undefined,
  rightLinkStyle: undefined,
  ariaText: { ariaTextDots: 'Slide' },
  defaultImage: undefined,
  images: [],
  srcSets: [],
  errorImage: ''
}

export const propsWithButtons = {
  paginationActiveClass: 'active',
  paginationStyle: undefined,
  hideButtons: false,
  leftLinkText: 'Previous',
  rightLinkText: 'Next',
  linksDefaultAction: true,
  leftLinkStyle: undefined,
  rightLinkStyle: undefined,
  ariaText: { ariaTextDots: 'Slide' },
  defaultImage: undefined,
  images: [],
  srcSets: [],
  errorImage: ''
}

export const propsWithImages = {
  paginationActiveClass: 'active',
  paginationStyle: undefined,
  hideButtons: false,
  leftLinkText: 'Previous',
  rightLinkText: 'Next',
  linksDefaultAction: true,
  leftLinkStyle: undefined,
  rightLinkStyle: undefined,
  ariaText: { ariaTextDots: 'Slide' },
  defaultImage: undefined,
  images: [
    'http://via.placeholder.com/640x360',
    'http://via.placeholder.com/640x360',
    'http://via.placeholder.com/640x360'
  ],
  srcSets: [
    {
      smallest: 'https://via.placeholder.com/160',
      srcSet: `"https://via.placeholder.com/160 160w, https://via.placeholder.com/320 320w, https://via.placeholder.com/480 480w,
      https://via.placeholder.com/640 640w, https://via.placeholder.com/960 960w, https://via.placeholder.com/1440 1440w"`
    },
    {
      smallest: 'https://via.placeholder.com/160',
      srcSet: `"https://via.placeholder.com/160 160w, https://via.placeholder.com/320 320w, https://via.placeholder.com/480 480w,
      https://via.placeholder.com/640 640w, https://via.placeholder.com/960 960w, https://via.placeholder.com/1440 1440w"`
    },
    {
      smallest: 'https://via.placeholder.com/160',
      srcSet: `"https://via.placeholder.com/160 160w, https://via.placeholder.com/320 320w, https://via.placeholder.com/480 480w,
      https://via.placeholder.com/640 640w, https://via.placeholder.com/960 960w, https://via.placeholder.com/1440 1440w"`
    }
  ]
}
