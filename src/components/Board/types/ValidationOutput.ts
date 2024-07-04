import { ValidationStatusEnum } from "./ValidationStatusEnum";

type ValidationOutput = {
  status: ValidationStatusEnum;
  error?: string;
};

export default ValidationOutput;
