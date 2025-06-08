import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MemberService {
	constructor(@InjectModel('Member') private readonly memberModel: Model<null>) {}
	public async signup(): Promise<string> {
		return 'signup executed!';
	}
	public async login(): Promise<string> {
		console.log('Mutation: login');
		return 'login executed!';
	}
	public async updateMember(): Promise<string> {
		console.log('Mutation:  updateMember');
		return ' updateMember executed!';
	}
	public async getMember(): Promise<string> {
		console.log('Query:  getMember');
		return 'getMember executed!';
	}
}
