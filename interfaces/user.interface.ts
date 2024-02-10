export type GetListUserResponse = {
  id?: number;
  username: string;
  email: string;
  password: string;
  fullname: string;
  phoneNumber: string;
  roles: string;
  socialMedia: null | any; // Adjust the type accordingly if you have specific social media data structure
  createdAt: string; // You might want to consider using Date type instead of string for dates
};

export type UpdateUserRequest = Omit<GetListUserResponse, 'socialMedia' | 'createdAt'>;

export type CreateUserRequest = Omit<GetListUserResponse, 'id' | 'socialMedia' | 'createdAt'>;
