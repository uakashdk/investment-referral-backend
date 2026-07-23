import mongoose from "mongoose";

import UserRepository from "../repositories/user.repository.js";

import {
  hashPassword,
  comparePassword,
} from "../utills/bcrypt.js";

import {
  generateAccessToken,
} from "../utills/jwt.js";

import generateReferralCode from "../utills/generateReferralCode.js";

class AuthService {
  /**
   * Register User
   */
  async registerUser(userData) {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      /**
       * Email Already Exists
       */
      const emailExists = await UserRepository.findByEmail(userData.email);

      if (emailExists) {
        throw new Error("Email already registered.");
      }

      /**
       * Mobile Already Exists
       */
      const mobileExists = await UserRepository.findByMobile(
        userData.mobile
      );

      if (mobileExists) {
        throw new Error("Mobile number already registered.");
      }

      /**
       * Validate Referral Code
       */
      let referredBy = null;

      if (userData.referredBy) {
        referredBy = await UserRepository.findByReferralCode(
          userData.referredBy
        );

        if (!referredBy) {
          throw new Error("Invalid referral code.");
        }
      }

      /**
       * Hash Password
       */
      const encryptedPassword = await hashPassword(
        userData.password
      );

      /**
       * Generate Referral Code
       */
      const referralCode =
        await generateReferralCode();

      /**
       * Create User
       */
      const user = await UserRepository.createUser(
        {
          fullName: userData.fullName,
          email: userData.email,
          mobile: userData.mobile,
          password: encryptedPassword,
          referralCode,
          referredBy: referredBy?._id || null,
        },
        session
      );

      /**
       * Commit Transaction
       */
      await session.commitTransaction();

      /**
       * Generate JWT
       */
      const token = generateAccessToken({
        id: user._id,
        email: user.email,
      });

      return {
        user,
        token,
      };
    } catch (error) {
      await session.abortTransaction();

      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
   * Login User
   */
  async loginUser(email, password) {
    const user = await UserRepository.findByEmail(
      email
    );

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isPasswordValid =
      await comparePassword(
        password,
        user.password
      );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    if (user.accountStatus !== "ACTIVE") {
      throw new Error("Your account is inactive.");
    }

    const token = generateAccessToken({
      id: user._id,
      email: user.email,
    });

    return {
      user,
      token,
    };
  }

  /**
   * User Profile
   */
  async getProfile(userId) {
    const user = await UserRepository.findById(
      userId
    );

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }
}

export default new AuthService();