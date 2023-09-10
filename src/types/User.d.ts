type userParams = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};
type params = {
  username: string;
  firstName: string;
  lastName: string;
};
type User = {
  createdAt: Date;
  firstName: string;
  id: string;
  lastName: string;
  updatedAt: Date;
  username: string;
};
type GlobalUser = {
  username: string;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  createdAt: Date;
  id: string;
};
type UserFromDb = {
  _id: string;
  username: string;
  hash: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};
