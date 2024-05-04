import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SignUpUserDto } from '@server/auth/dto/sign-up-user.dto';

@ValidatorConstraint({ name: 'IsPasswordMatch', async: false })
export class IsPasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(passwordConfirm: string, args: ValidationArguments) {
    const object = args.object as SignUpUserDto;
    return object.password === passwordConfirm;
  }

  // defaultMessage(validationArguments?: ValidationArguments) {
  defaultMessage() {
    return 'Passwords do not match';
  }
}
