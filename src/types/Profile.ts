export default interface Profile {
  image: ProfileImgUI
  name: string
  url: string
  alt: string
}

export interface ProfileImgUI {
  src: string
  srcSets: string
}
