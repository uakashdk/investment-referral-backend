import UserRepository from "../repositories/user.repository.js";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const CODE_LENGTH = 8;

const generateRandomCode = () => {
  let code = "";

  for (let i = 0; i < CODE_LENGTH; i++) {
    const index = Math.floor(Math.random() * CHARACTERS.length);
    code += CHARACTERS[index];
  }

  return code;
};

const generateReferralCode = async () => {
  let referralCode;
  let exists = true;

  while (exists) {
    referralCode = generateRandomCode();

    exists = await UserRepository.findByReferralCode(referralCode);
  }

  return referralCode;
};

export default generateReferralCode;