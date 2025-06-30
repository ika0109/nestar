import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';
import { LikeGroup } from '../../enums/like.enum';

@InputType() // => InputType orqalik tuzilgan
export class LikeInput {
	@IsNotEmpty()
	@Field(() => String)
	memberId: ObjectId;  // kim like qoyyapti osha user object id

	@IsNotEmpty()
	@Field(() => String)
	likeRefId: ObjectId; // qaysi targetni like qilmoqda likerefId belgilangan

	@IsNotEmpty()
	@Field(() => LikeGroup)
	likeGroup: LikeGroup;  // qaysi turdagi like amalga oshirilyapti
}



//**export enum LikeGroup {
	//MEMBER = 'MEMBER',
	//PROPERTY = 'PROPERTY',
	//ARTICLE = 'ARTICLE',}