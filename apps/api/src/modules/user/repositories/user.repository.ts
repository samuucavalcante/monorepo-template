import { UserModel } from "@modules/user/repositories/user.schema.repository";
import { aggregationBuildPagination } from "@shared/utils/mongo.utils";
import type { IReadListDTO } from "arc/shared";
import type { User } from "arc/user/entities";
import { Types, type PipelineStage } from "mongoose";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository {
  async findByEmail(email?: string): Promise<User | null> {
    const pipeline: PipelineStage[] = [
      {
        $match: { email },
      },
    ];

    const result = await UserModel.aggregate<User>(pipeline);
    return result[0] ?? null;
  }

  async create(
    user: Omit<User, "_id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    return (await UserModel.create(user)).toJSON();
  }

  async findById(userId: string): Promise<User | null> {
    const pipeline: PipelineStage[] = [
      {
        $match: { _id: new Types.ObjectId(userId) },
      },
    ];

    const result = await UserModel.aggregate<User>(pipeline);
    return result[0] ?? null;
  }

  async update(userId: string, user: Partial<User>): Promise<User> {
    const result = await UserModel.findOneAndUpdate({ _id: userId }, user, {
      new: true,
    });

    return result!.toJSON() as User;
  }

  async paginate(params: IReadListDTO): Promise<User[]> {
    const pipeline: PipelineStage[] = [];

    pipeline.push(...aggregationBuildPagination(params));

    return await UserModel.aggregate<User>(pipeline);
  }
}
