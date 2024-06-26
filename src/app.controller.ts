import { Controller, Request, Post, Response } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    const User = req.body;
    return this.authService.login(User.username, User.password);
  }

  @Post('logout')
  async logout(@Response({ passthrough: true }) res) {
    res.clearCookie('jwt');
    return 'logout';
  }
}
