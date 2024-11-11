export type UserProfileType = {
    name: string;
    email: string;
    role: string;
    image: ImageUserType
};
  
type ImageUserType = {
    fileName: string;
    imageUrl: string
}