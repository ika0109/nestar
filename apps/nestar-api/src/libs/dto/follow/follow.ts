import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { Member, TotalCounter } from '../member/member';
import { MeLiked } from '../like/like';
// databasedan chqib ketedigon malumotlar 
@ObjectType()
export class MeFollowed {
	@Field(() => String)
	followingId: ObjectId;

	@Field(() => String)
	followerId: ObjectId;

	@Field(() => Boolean)
	myFollowing: boolean; // men podpiska bolgan bolmaganlik tekshiriladi
}

@ObjectType()
export class Follower {// menga tegishlik malumotlarni kimga follow qilyapman
	@Field(() => String)
	_id: ObjectId;

	@Field(() => String)
	followingId: ObjectId;

	@Field(() => String)
	followerId: ObjectId;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;

	/** from aggregation **/

	@Field(() => [MeLiked], { nullable: true })
	meLiked?: MeLiked[];

	@Field(() => [MeFollowed], { nullable: true })
	meFollowed?: MeFollowed[];

	@Field(() => Member, { nullable: true })
	followerData?: Member;
}

@ObjectType()
export class Following {// siz follow bolgan kishi
	@Field(() => String)
	_id: ObjectId; // database ozini idsi

	@Field(() => String)
	followingId: ObjectId;

	@Field(() => String)
	followerId: ObjectId;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;

	/** from aggregation **/

	@Field(() => [MeLiked], { nullable: true })
	meLiked?: MeLiked[];

	@Field(() => [MeFollowed], { nullable: true })
	meFollowed?: MeFollowed[];

	@Field(() => Member, { nullable: true })
	followingData?: Member;
}

@ObjectType()
export class Followings {
	@Field(() => [Following])
	list: Following[];

	@Field(() => [TotalCounter], { nullable: true })
	metaCounter: TotalCounter[];
}

@ObjectType()
export class Followers {
	@Field(() => [Follower])
	list: Follower[];

	@Field(() => [TotalCounter], { nullable: true })
	metaCounter: TotalCounter[];
}
