export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string | null;
  role: "user" | "admin";
  avatar: string | null;
  createdAt: number;
  updatedAt: number;
}

export interface IWorkplace {
  id: string;
  name: string;
  address: string;
  city: string;
  type: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
  images: string;
}
