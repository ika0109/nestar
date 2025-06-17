import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { MemberAuthType, MemberStatus, MemberType } from '../../enums/member.enum';
import { ViewGroup } from '../../enums/view.enum';

//VALIDATION (DTO) => BACKEND from FRONTAND
@ObjectType()
export class View {
	@Field(() => String)
	_id: ObjectId;

	@Field(() => ViewGroup)
	ViewGroup: ViewGroup;

	@Field(() => String)
	ViewRefId: ObjectId;

	@Field(() => String)
	memberId: ObjectId;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;
}
