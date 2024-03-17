import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from 'src/config/jwt.config';
import { AuthService } from './auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: config.jwt.secret,
      ignoreExpiration: false,
    });
  }
  // The validate() method is called whenever a request is made to an endpoint that is protected by this guard.
  // 验证过程在super()中已经完成，这里只需要返回一个user对象即可。
  async validate(payload: any) {
    console.log(payload, 'payload');
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload;
  }
  // const user = await this.authService.validateUser(
  //   payload.name,
  //   payload.pass,
  // );
  // console.log(payload, 'payload', user);
  // if (!payload) {
  //   throw new UnauthorizedException();
  // }
  // if (user) {
  //   return { id: user.id, name: user.name };
  // } else {
  //   throw new UnauthorizedException();
  // }
}
