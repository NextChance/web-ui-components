export const defaultProps = {
  paginationActiveClass: 'active',
  paginationStyle: undefined,
  hasLinkLeft: false,
  hasLinkRight: false,
  leftLinkText: 'Previous',
  rightLinkText: 'Next',
  linksDefaultAction: false,
  leftLinkStyle: undefined,
  rightLinkStyle: undefined,
  ariaText: { ariaTextDots: 'Slide' },
  defaultImage: undefined,
  images: []
}

export const propsWithButtons = {
  paginationActiveClass: 'active',
  paginationStyle: undefined,
  hasLinkLeft: true,
  hasLinkRight: true,
  leftLinkText: 'Previous',
  rightLinkText: 'Next',
  linksDefaultAction: true,
  leftLinkStyle: undefined,
  rightLinkStyle: undefined,
  ariaText: { ariaTextDots: 'Slide' },
  defaultImage: undefined,
  images: []
}

export const propsWithImages = {
  paginationActiveClass: 'active',
  paginationStyle: undefined,
  hasLinkLeft: true,
  hasLinkRight: true,
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
  ]
}
