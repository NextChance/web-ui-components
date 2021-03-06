# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

<!--
## [UNRELEASED]
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
-->

## v1.20.1
- Add loading state on nc-slideshow image [BH-5944]

## v1.20.0
### Changed
- Update style for nc-carousel [BH-5419]
- Add image on error for nc-slideshow [BH-5743]

## v1.19.2
### Changed
- Replace lazy-load by a custom lazy-load in nc-slideshow-v2 [BH-5757]

## v1.19.1  >> invalid

## ## v1.19.0
### Added
- Create component nc-lazy-load
### Changed
- Update cms-components to use new lazy-load component
### Fixed
- Send different payload depending on the type on nc-carousel


## v1.18.2
### Added
- Create new label for product-detail and product-carousel to use when a product is  highlighted (example BlackFriday's product) [BH-5216]

## v1.18.1
### Changed
- fix cms product detail component [BH-4642]

## v1.18.0
### Changed
- Include caption [BH-4642]

## v1.17.0
### Added
- send id into evento for click event on cms components [BH-4823] 
- lead generation into cms components [BH-4621] 

## v1.16.0
### Changed
- nc-slideshow-v2: reduce size dots and updated dots behaviour (now navigation using dots is optional) [BH-4809]
### Added
- Add viewability mixin in 'nc-carousel', 'nc-featured-detail', 'nc-product-detail', 'nc-featured-grid' and 'nc-slideshow-v2'. Add method to emit event [BH-4948]

## v1.15.4
### Fixed
- Fix border-radius in nc-slideshow-v2 for iOS: Add transform:translateX(0) [BH-4955]
- Fix nc-carousel mosaic fit correctly with browser zoom [BH-4951]

## v1.15.3
### Fixed
- Fix height for placeholder on nc-slideshow when images.length === 0 [BH-4864]

## v1.15.2
### Added
- New property in nc-slideshow "srcSets" [BH-4795]

## v1.15.1  >> invalid

## v1.15.0
### Added
- new subtitle prop to nc-featured-details
### Changed
- Updated styles components


## v1.14.26
### Fixed
- nc-slider-v3 accept as valid position 0 [BH-4103] [BH-4106]

## v1.14.25
### Fixed
- Navigation event handled properly [BH-4498]

## v1.14.24
### Fixed
- Styling issues with ncCarousel [BH-4456][BH-4457]


## v1.14.23
### Fixed
- Extra content length on list when user is on mobile

## v1.14.22
### Fixed
- Image styling on mosaic carousel

## v1.14.21
### Changed
- Logic to animate nc-core-carousel
### Fixed
- Styles and remove logic in component nc-carousel
- Styles in nc-core-carousel

## v1.14.20
### Fixed
- Update components nc-product-detail and nc-carousel


## v1.14.19
### Fixed
- nc-carousel template error


## v1.14.18
### Fixed
- Change const name in computed

## v1.14.17
### Fixed
- Change computed and update styles


## v1.14.16
### Fixed
- Update styles nc-product-detail


## v1.14.15
### Fixed
- Update styles nc-product-detail, fixed image height

## v1.14.14
### Fixed
- Update styles nc-product-detail, fixed line-height


## v1.14.13
### Changed
- Update styles nc-product-detail

## v1.14.12
### Changed
- Update styles

## v1.14.11
### Changed
- Fix color name

## v1.14.10
### Changed
- Update styles

## v1.14.9
### Added
- New component nc-product-carousel [BH-4038]
- New component nc-product-detail [BH-4044]

## v1.14.8
### Fixed
- Scoped styles nc-slideshow


## v1.14.7
### Changed
- Title font sizes on NcFeaturedDetail

## v1.14.6
### Changed
- Title font sizes on NcFeaturedGrid

## v1.14.5
### Fixed
- Update animation nc-slidesdhow-v2

## v1.14.4
### Fixed
- Update styles for cms-components


## v1.14.3
### Fixed
- Handle focus on textarea autogrow 


## v1.14.2
### Fixed
- slideshow-v2: ClearTimeout in animation

## v1.14.1
### Fixed
- featured-grid: Emit event when click in subtitle link

## v1.14.0
### Added
- Add storybook and create stories
- Create new slideshow component
- Create featured-grid component for cms
- Create featured-detail component

## v1.13.0
### Added
- Slider-V3 component. Now with predefined steps to force slider to pass just values given as config.


## v1.12.0
### Fixed
- Add z-index in nc-text-input label to display also when a field has been autocompleted


## v1.11.1
### Fixed
- Paralel package version blended

## v1.11.0
### Added
- nc-slider-v2 add property isDisabled and update styles


## v1.10.3
### Added
- nc-text-input and nc-phone-input now has disabled styles


## v1.10.2
### Added
- nc-text-input add property readonly


## v1.10.1
### Changed
- nc-slideshow buttons now appear or disappear depending on the number of slide displayed

## v1.10.0
### Added
- nc-slideshow button next/previous now have slot to add any icon


## v1.9.3
### Added
- nc-text-input error tag with parameters
- nc-textarea error tag with parameters
### Removed
- nc-image-uploader forced inline styles
### Fixed
- nc-phone-input validation event emit


## v1.9.2 >> invalid


## v1.9.1
### Fixed
- nc-card-item draws an image if image slot is not present and component has image property

## v1.9.0
### Changed
- nc-card-item allows image as slot keeping the default one if slot is not passed

## v1.8.3
### Changed
- nc-text-input will not trim always
- nc-phone-input will trim always

## v1.8.2
### Fixed
- nc-text-input error and extra content margin top

## v1.8.1
### Fixed
- nc-text-input and nc-card-item test

## v1.8.0
### Changed
- nc-list and nc-text-input due to UiKit update

## v1.7.0
### Added
- User can click on ncSliderV2 to move closest trigger.

## v1.6.0
### Changed
- ncCardItem new slots for caption, and header

## v1.5.0
### Fixed
- Remove double background on ncImageLoader to not show it on transparent uploads.
### Changed
- ncPhoneInput now sends formatted phone without spaces. When we introduce a valid phone number (including dashed, spaced or split with dash bars) the result will be the same.

## v1.4.0
### Changed
- ncCardItem new slot inside subheader

## v1.3.0
### Changed
- ncPhoneInput, input type as prop

## v1.2.0
### Changed
- ncCardItem has no default values to hide those elements where a value is not passed

## v1.1.0
### Added
- ncSlideshow shows pagination just when there is more than one page to show

## v1.0.2
### Changed
- ncModal event handler fix

## v1.0.1
### Changed
- Merge

## v1.0.0
### Changed
- ncModal API update

## v0.3.0
### Changed
- NcCardItem uses BEM classnames

## v0.2.0

### Changed
- nc-card-item, eliminates styles in line for component in use.

## v0.1.11

### Added

- nc-textarea allows autoresize on input

## v0.1.10 >> INVALID
## v0.1.9 >> INVALID

## v0.1.8

### Added

- nc-list Make dynamic changes on selected



## v0.1.7

### Fixed

- nc-modal resize



## v0.1.6

### Fixed

- nc-modal get better height calculated



## v0.1.5

### Added

- nc-list Waiting for nextTick to take selected item



## v0.1.4 - 2019-07-08

### Added

- nc-slider-v2

### Changed

- New component nc-image-uploader #37
- nc-card-item refactor
- nc-image-uploader refactor
- nc-list refactor
- nc-modal refactor
- nc-phone-input refactor
- nc-slider refactor
- nc-slideshow refactor
- nc-text-input refactor
- nc-textarea refactor



## v0.1.2 - 2019-06-14

### Fixed

- Fixed Close icon for ncModal #55



## v0.1.1 - 2019-06-13

### Fixed

- ncModal bug fixing and naming changes #21

### Added

- New component nc-card-item #183
- New component nc-separator #101
- New component nc-text-input #97
- New component nc-phone-input #24
- New component nc-button #17
- New component nc-slideshow #6
- New component nc-modal #4
- New component nc-list #11
- Added package.json configuration #8
- New component nc-loader #5

### Changed

- Changed ncList to highlight selected value #33
- Modified ncList to use nc-text-input #31
- Component nc-list to customize item #96
