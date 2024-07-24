export interface CharacterPost {
  md: string
}
export interface CharacterDetailed {
  name: string
  code: string
  posts: CharacterPost[]
  headerImage: string
  profileImage: string
}
export interface Character {
  name: string
  code: string
  headerImage: string
  profileImage: string
}
