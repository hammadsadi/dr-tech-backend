import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken } from '../../utils/auth.utils';
import { User } from '../user/user.model';
import { TAuth } from './auth.types';

// Login User
const userLogin = async (payload: TAuth) => {
  // Check User
  const isExistUser = await User.isExistUserByEmailOrNumber(payload.email);
  if (!isExistUser) {
    throw new AppError(400, 'User Not Found');
  }

  // Match Password
  if (
    !(await User.isPasswordMatched(payload.password, isExistUser?.password))
  ) {
    throw new AppError(400, 'Invalid Credentials');
  }

  // Create Payload
  const userPayload = {
    userEmail: isExistUser?.email,
    role: isExistUser?.role,
    userId: isExistUser?._id,
  };

  // Create Token
  const token = createToken(
    userPayload,
    config.JWT_ACCESS_TOKEN_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  );

  return { accessToken: token };
};

// Get Login User Info From DB
const getLoginUserInfoFromDB = async (email: string) => {
  const user = await User.findOne({ email: email });
  return user;
};
export const AuthServices = {
  userLogin,
  getLoginUserInfoFromDB,
};
