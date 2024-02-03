import {
  CanActivate,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: GraphQLExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)

    const token = this.extractTokenFromHeader(ctx.getContext().req)

    if (!token) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED)
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_KEY,
      })
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      ctx.getContext().req['user'] = payload
    } catch {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED)
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
