import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './types/auth-response.type';
import { AuthInput } from './dto/inputs/auth.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, {name: 'signup'})
  async signup(
    @Args('authInput') authInput:AuthInput,
  ): Promise<AuthResponse>{
  
    return await this.authService.signup(authInput);
  }


  @Mutation(() => AuthResponse, {name: 'login'})
  async login(
    @Args('authInput') authInput:AuthInput,
  ): Promise<AuthResponse>{
    
    return await this.authService.login(authInput);
  }
}